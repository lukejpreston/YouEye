#!/usr/bin/env node

const fs = require('fs')

var name, projectDir

process.argv.forEach(function(arg, index) {
    if (arg === 'name') name = process.argv[index + 1]
    if (arg === 'dir') projectDir = __dirname + '/' + process.argv[index + 1]
})

function exists(fileName) {
    try {
        fs.lstatSync(fileName)
        return true
    } catch (e) {
        return false
    }
}

function copyFile(fileName, destination) {
    var data = fs.readFileSync(fileName).toString()
    fs.writeFileSync(destination, data)
    console.log('copied:', fileName, destination);
}

function copyFolder(folderName, destination) {
    fs.readdirSync(folderName)
        .map(function(fileName) {
            return {
                from: folderName + '/' + fileName,
                to: destination + '/' + fileName
            }
        })
        .forEach(function(data) {
            copyFile(data.from, data.to)
        })
}

function createSublimeProject() {
    const sublimeProject = {
        "folders": [{
                "name": name,
                "path": ".",
                "folder_exclude_patterns": [
                    "_site",
                    ".sass-cache"
                ],
                "file_exclude_patterns": [
                    "Gemfile.lock",
                    "jekyll.pid"
                ]
            }

        ]
    }

    if (!exists(projectDir + '/' + name + '.sublime-project')) fs.writeFileSync(projectDir + '/' + name + '.sublime-project', JSON.stringify(sublimeProject, null, 4))
}

function createFolders() {
    const folders = [
        '/_includes',
        '/_includes/site',
        '/_includes/you_eye',
        '/_includes/you_eye/components',
        '/_includes/you_eye/default',
        '/_layouts',
        '/_layouts/you_eye',
        '/_layouts/site',
        '/_sass',
        '/_sass/site',
        '/_sass/you_eye',
        '/_sass/libs',
        '/assets',
        '/assets/site',
        '/assets/libs',
        '/scripts',
        '/scripts/site',
        '/scripts/you_eye',
        '/scripts/libs',
        '/images',
        '/css'
    ]

    folders.filter(function(folder) {
        return !exists(projectDir + folder)
    }).forEach(function(folder) {
        fs.mkdirSync(projectDir + folder)
        console.log('created ', projectDir + folder);
    })
}

function createOnceFiles() {
    if (!exists(projectDir + '/_sass/site/main.scss')) {
        fs.writeFileSync(projectDir + '/_sass/site/main.scss', '')
        console.log('created', projectDir + '/_sass/site/main.scss');
    }

    const files = [
        '404.html',
        '_config.yml',
        'index.html',
        '_sass/variables.scss'
    ]

    files.forEach(function(file) {
        if (!exists(projectDir + '/' + file)) copyFile(file, projectDir + '/' + file)
    })
}

function createOrReplaceFiles() {
    const folders = [
        '/_includes/you_eye/components',
        '/_includes/you_eye/default',
        '/_layouts/you_eye',
        '/_sass/you_eye',
        '/_sass/libs',
        '/assets/libs',
        '/scripts/you_eye',
        '/scripts/libs',
        '/css'
    ]

    folders.forEach(function(folder) {
        copyFolder(__dirname + folder, projectDir + folder)
    })

    const files = [
        'Gemfile',
        '.gitignore',
        'start.sh',
        'serve.sh'
    ]

    files.forEach(function(file) {
        copyFile(file, projectDir + '/' + file)
    })
}

createSublimeProject()
createFolders()
createOnceFiles()
createOrReplaceFiles()

console.log('created:', name, 'in', projectDir);
