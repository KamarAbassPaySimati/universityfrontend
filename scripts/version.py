import requests, json , os, re
import sys
try:
    args = sys.argv
    print(args,"args")
    found = False
    matches = ""
    categories = ['feature','bugfix','hotfix','release']
    print(categories)
    for y in categories:
        new_list = [x for x in args if re.search(y, x)]
        if new_list:
            matches = new_list[0]
            break
    print(matches)
    print("branch should display")
    version = matches.split("/")[1]
    stage= os.environ.get("BITBUCKET_BRANCH")
    print(stage, "stages")
    print(version,'version')
    if len(version)<5:
        version = version+".0"
    url ="https://8fs3io4nu3.execute-api.ap-south-1.amazonaws.com/dev/update"
    r = requests.post(url, data=json.dumps({ "updateItems":{
            "admin_web_application": {
        "latest_version": version,
        "min_version": version
    } }, "stage": stage
    }), headers={"Content-type":"application/json"})
    print(r.status_code)
except:
    print("yes")
    