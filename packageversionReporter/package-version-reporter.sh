#!/bin/bash

github_repo_url=$1
script_path=$2
commit_message='Updated package version reports'
all_envs=$3
retries=3


# Create a temporary directory
temp_dir=$(mktemp -d -t ci-$(date +%Y%m%d-%H%M%S)-XXXXXXXXXX)

git_dir=$(pwd)



# Clone the repository to the current directory
 gh repo clone  $github_repo_url $temp_dir

# Check if cloning was successful
if [ $? -eq 0 ]; then
    echo "Successfully cloned the repo."
else
    echo "Error occurred while cloning the repo."
    exit 1
fi



# Check if copying was successful
if [ $? -eq 0 ]; then
    echo "Successfully copied the directory."
else
    echo "Error occurred while copying the directory."
    exit 1
fi



node $script_path/dist/index.js $temp_dir/packageVersionReports  $all_envs

# Navigate to the cloned repository
cd  $temp_dir/packageVersionReports

# Configure git 
git config --global user.email "buildbot@adiza.dev"
git config --global user.name "buildbot"

# Add the copied files to git tracking
git add packageVersionReport.html

# Commit the changes with the provided message
git commit -m "$commit_message"


git remote add kramo https://sfpowerscripts:$GH_TOKEN@github.com/$github_repo_url.git

attempt=0
until [ $attempt -ge $retries ]
do
   git pull --rebase kramo main && git push kramo main && break
   attempt=$[$attempt+1]
   sleep 15
done

# Check if pushing was successful
if [ $? -eq 0 ]; then
    echo "Successfully pushed the changes."
else
    echo "Error occurred while pushing the changes."
    exit 1
fi

# Navigate back to home before removing the temporary directory
cd ~
rm -rf $temp_dir

# Done
echo "Done!"
