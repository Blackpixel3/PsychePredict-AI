import io
import json
import os
import tarfile
import time
import httpx

def main():
    home = os.path.expanduser('~')
    cfg_file = os.path.join(home, '.antideploy', 'config.json')
    if not os.path.exists(cfg_file):
        print("Error: ~/.antideploy/config.json not found. Connect first.")
        return

    with open(cfg_file, 'r') as f:
        token = json.load(f)['token']

    with open('.antideploy.json', 'r') as f:
        app_id = json.load(f)['applicationId']

    print(f"Packaging project for Antideploy application: {app_id}...")

    tar_buffer = io.BytesIO()
    def filter_tar(tarinfo):
        name = tarinfo.name.replace('\\', '/')
        for excl in [
            '.git',
            'node_modules',
            'backend/.venv',
            'backend/venv',
            '.pytest_cache',
            '__pycache__',
            'assessments.db',
            'deploy_bundle.tar.gz',
        ]:
            if excl in name:
                return None
        if name.endswith('.env') and not name.endswith('.env.example'):
            return None
        return tarinfo

    with tarfile.open(fileobj=tar_buffer, mode='w:gz') as tar:
        tar.add('.', arcname='.', filter=filter_tar)

    tar_bytes = tar_buffer.getvalue()
    print(f"Archive ready: {len(tar_bytes) / 1024:.1f} KB. Uploading to Antideploy...")

    headers = {
        'Authorization': f'Bearer {token}',
    }

    url = f"https://antideploy.com/api/v1/deploy?applicationId={app_id}"

    with httpx.Client(timeout=120.0) as client:
        files = {
            'archive': ('archive.tar.gz', tar_bytes, 'application/gzip'),
        }
        resp = client.post(url, headers=headers, files=files)

        if resp.status_code not in (200, 202):
            print(f"Deploy POST error: {resp.status_code} {resp.text}")
            return

        data = resp.json()
        if resp.status_code == 200 and data.get('status') == 'unchanged':
            print("Deploy status: Unchanged (Content hash matches last deployment).")
            return

        task_id = data.get('taskId')
        watch_url = data.get('watch')
        print(f"Deploy queued successfully! Task ID: {task_id}")
        if watch_url:
            print(f"Watch URL: {watch_url}")

        # Poll deployment status
        poll_url = f"https://antideploy.com/api/v1/deployments/{task_id}"
        print("Watching build and deploy progress...")

        start_time = time.time()
        while time.time() - start_time < 600:  # 10 minutes timeout
            time.sleep(4)
            poll_resp = client.get(poll_url, headers=headers)
            if poll_resp.status_code != 200:
                print(f"Poll status: {poll_resp.status_code}")
                continue

            status_data = poll_resp.json()
            status = status_data.get('status')
            step = status_data.get('step')
            print(f"Status: {status} (Step: {step})")

            if status == 'succeeded':
                print("\n=======================================================")
                print("🎉 DEPLOYMENT SUCCEEDED!")
                print(f"Live URL: {status_data.get('url')}")
                print(f"Summary: {status_data.get('summary')}")
                print("=======================================================\n")

                # Check security scan status
                security = status_data.get('security', {})
                if security:
                    print(f"Security Scan Status: {security.get('status')}")
                    issues = security.get('issues', [])
                    if issues:
                        print("Security issues found:")
                        for iss in issues:
                            print(f" - {iss}")
                    else:
                        print("Zero security issues found.")
                break

            elif status == 'failed':
                print("\n=======================================================")
                print("❌ DEPLOYMENT FAILED")
                print(f"Error: {status_data.get('error')}")
                print(f"Failed Step: {status_data.get('failedStep')}")
                print("Build Log snippet:")
                print(status_data.get('deployment', {}).get('buildLog', 'No build log'))
                print("Runtime Log snippet:")
                print(status_data.get('deployment', {}).get('runtimeLog', 'No runtime log'))
                print("=======================================================\n")
                break

if __name__ == '__main__':
    main()
