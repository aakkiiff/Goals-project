
# 1 Repo 2 branch jenkins CI - :

  ![Diagram](https://github.com/aakkiiff/Goals-project/blob/dev/diagram.jpg)
  
  **how to use it?**
  

 1. push the code to the dev branch of the repository.
 2. raise a PR
 3. before that you have to configure github webhook and jenkins plugin to only trigger only if dev -> master branch is raised PR for.To do this:
	 1. have jenkins,docker running on public cloud(aws ec2).
	 2. add jenkins to docker group
	 3. plugin download: Generic Webhook Trigger
	 4. make a pipeline, check generic webhook trigger.
	 5. check post content parameter.assign variables which you are willing to grab from github webhook payload.To do this:
			 - go to github webhook config page.
			 - make a pipeline, check generic webhook trigger.and from here name the token "something" and grab the webhook url, http://jenkins_url/generic-webhook-trigger/invoke?token=something,save the pipeline for now.and past the url to github and content type=json,event=pullrequest,save.it should be green ticked
			 - now make a pull request and from webhook recent deliveries u need to grab 
					 - action,base,head name. using regex
			-  in jenkins post c parameter config, add name of variable = action,expression= `$.action` , jsonpath
			-  same thing for base,`$.pull_request.base.ref` and head, `$.pull_request.head.ref`
			- now var is assigned ,u need to use it to varify the webhook trigger reason and trigger jenkins.thus go to optional filters, Expression = `^opened master dev$` and text = `$action $base $head`
			- and paste the jenkinscode to the script section
4. add dockerhub and github creds to jenkins and have ur own env vars.
5. push tthe code to dev branch,make pr,jenkin will trigger and send the tag to master branch.then review the PR and code will be merged
	 

