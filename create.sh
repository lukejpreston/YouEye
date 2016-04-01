#!/bin/bash

name=$1
projectDir=$2

function create {
    if [[ ! -e $projectDir/$name.sublime-project ]]; then
        echo '{ "folders": [{ "name": "'$name'", "path": ".", "folder_exclude_patterns": [ "_site", ".sass-cache", "you_eye", "libs" ] }, { "name": "You Eye", "path": "../you_eye", "folder_exclude_patterns": [ "css" ], "file_exclude_patterns": [ ".gitignore", "404.html", "_config.yml", "Gemfile", "index.html", "serve.sh", "README.md", "serve.sh", "create.sh", "start.sh", "variables.scss" ] }] }' > $projectDir/$name.sublime-project
    fi

    mkdir -p $projectDir/_includes/you_eye/components
    mkdir -p $projectDir/_includes/you_eye/default
    mkdir -p $projectDir/_includes/site
    mkdir -p $projectDir/_layouts/you_eye
    mkdir -p $projectDir/_layouts/site
    mkdir -p $projectDir/_sass/site
    mkdir -p $projectDir/_sass/you_eye
    mkdir -p $projectDir/_sass/libs
    mkdir -p $projectDir/assets/libs
    mkdir -p $projectDir/assets/site
    mkdir -p $projectDir/css
    mkdir -p $projectDir/scripts/libs
    mkdir -p $projectDir/scripts/you_eye
    mkdir -p $projectDir/scripts/site

    touch $projectDir/_sass/site/main.scss

    if [[ ! -e $projectDir/update.sh ]]; then
        echo 'cd ../you_eye; ./create.sh' $name $projectDir > $projectDir/update.sh
        chmod 755 $projectDir/update.sh
    fi

    if [[ ! -e $projectDir/404.html ]]; then
        cp 404.html $projectDir
    fi

    if [[ ! -e $projectDir/_config.yml ]]; then
        cp _config.yml $projectDir
    fi

    if [[ ! -e $projectDir/index.html ]]; then
        cp index.html $projectDir
    fi

    if [[ ! -e $projectDir/_sass/variables.scss ]]; then
        cp _sass/variables.scss $projectDir/_sass
    fi
}

function update {
    cp -r _includes/you_eye/components $projectDir/_includes/you_eye
    cp -r _includes/you_eye/default $projectDir/_includes/you_eye
    cp -r _layouts/you_eye $projectDir/_layouts
    cp -r _sass/you_eye $projectDir/_sass
    cp -r _sass/libs $projectDir/_sass
    cp -r assets/libs $projectDir/assets
    cp -r scripts/you_eye $projectDir/scripts
    cp -r scripts/libs $projectDir/scripts
    cp -r css $projectDir

    cp Gemfile $projectDir/Gemfile
    cp .gitignore $projectDir/.gitignore
    cp start.sh $projectDir/start.sh
    cp serve.sh $projectDir/serve.sh
}

create
update
