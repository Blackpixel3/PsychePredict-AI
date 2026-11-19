import os
import time
import urllib.request
import urllib.error
import json

state_file = '.device_auth_state.json'
if not os.path.exists(state_file):
    print("State file not found.")
    exit(1)

with open(state_file, 'r') as f:
    state = json.load(f)

device_code = state['deviceCode']
interval = state.get('interval', 5)

url = 'https://antideploy.com/api/v1/device/token'
payload = json.dumps({'deviceCode': device_code}).encode('utf-8')

home = os.path.expanduser('~')
antideploy_dir = os.path.join(home, '.antideploy')
os.makedirs(antideploy_dir, exist_ok=True)
config_file = os.path.join(antideploy_dir, 'config.json')

start_time = time.time()
while time.time() - start_time < 900:  # 15 minutes expiry
    req = urllib.request.Request(
        url,
        data=payload,
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    try:
        with urllib.request.urlopen(req) as resp:
            if resp.status == 200:
                data = json.loads(resp.read().decode('utf-8'))
                token = data.get('token')
                account = data.get('account', {})
                account_label = account.get('label') or account.get('email') or 'connected'

                # Save token securely without printing it
                with open(config_file, 'w') as cf:
                    json.dump({'token': token}, cf)

                try:
                    os.chmod(config_file, 0o600)
                except Exception:
                    pass

                # Clean up temporary state
                if os.path.exists(state_file):
                    os.remove(state_file)

                print(f"POLL_SUCCESS: Connected account: {account_label}")
                break
    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8')
        try:
            err_data = json.loads(err_body)
            err_code = err_data.get('error') or err_data.get('message') or err_body
        except Exception:
            err_code = err_body

        if 'authorization_pending' in str(err_code):
            time.sleep(interval)
            continue
        elif 'access_denied' in str(err_code):
            print(f"POLL_DENIED: {err_code}")
            if os.path.exists(state_file):
                os.remove(state_file)
            break
        elif 'expired_token' in str(err_code):
            print("POLL_EXPIRED")
            if os.path.exists(state_file):
                os.remove(state_file)
            break
        else:
            print(f"POLL_HTTP_ERROR: {e.code} {err_body}")
            time.sleep(interval)
            continue
    except Exception as exc:
        print(f"POLL_EXCEPTION: {exc}")
        time.sleep(interval)
