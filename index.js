//const mysql = require("mysql")
const fs = require("fs")
const http = require("http")
const prompt = require("prompt-sync")({ sigint : true })
//const ls = require("local-storage")

const OS = {
    version : "1.0.0",
    user : "",
    note : {},
    variables : {},
    tokenize (uncatagorized) {
        return uncatagorized.split(" ")
    },

    main () {
        const syntaxes = prompt(" >")
        //console.log(syntaxes)
        const tokens = this.tokenize(syntaxes)
        this.run(tokens)
        //this.main()
    },

    run (syntaxes) {
        if (syntaxes[0] == "usr" && syntaxes[1]) {
            this.user = syntaxes[1]
        }
        if (syntaxes[0] == "qrt") {
            return
        }
        if (syntaxes[0] == "") {
            this.main()
        }
        if (this.user != "") {
            if (syntaxes[0] != "qrt") {
                if (syntaxes[0] == "dev" && syntaxes[1] && syntaxes[2] == "=" && syntaxes[3]) {
                    this.variables[syntaxes[1]] = syntaxes[3]
                }
                if (syntaxes[0] == "prt" && syntaxes[1]) {
                    if (this.variables[syntaxes[1]]) {
                        try {
                            console.log(this.variables[syntaxes[1]])
                        } catch (error) {
                            console.log(error)
                        }
                    } else {
                        console.log(syntaxes[1])
                    }
                }
                if (syntaxes[0] == "chk") {
                    console.log("Dazh "+this.version+" "+this.user)
                }
                /*if (syntaxes[0] == "pla") {
                    prompt("! ign >")
                }*/
                if (syntaxes[0] == "ext") {
                    this.user = ""
                }
                if (syntaxes[0] == "sav") {
                    const note = prompt("! fil >")
                    if (this.note["cur"] != null) {
                        this.note["cur"] = this.note["cur"]+"\n"+note
                    } else {
                        this.note["cur"] = ""+"\n"+note
                    }
                }
                if (syntaxes[0] == "cre" && syntaxes[1]) {
                    fs.writeFileSync(syntaxes[1],this.note["cur"])
                    console.log("File created")
                }
                if (syntaxes[0] == "dat"/* && syntaxes[1] && syntaxes[2] == "=" && syntaxes[3]*/) {
                    //this.note["dat"]
                    console.log(Date())
                }
                if (syntaxes[0] == "dow" && syntaxes[1] && syntaxes[2]) {
                    const where = syntaxes[1]
                    const to = syntaxes[2]
                    const file = fs.createWriteStream(to)
                    http.get(where, (response) => {
                        response.pipe(file)
                        file.on("finish", () => {
                            file.close(() => {
                                console.log("File downloaded")
                            })
                        })
                    }).on("error", (error) => {
                        fs.unlink(to, () => {
                            console.log("File failed to download, "+error)
                        })
                    })

                }
                if (syntaxes[0] == "lod") {
                    console.log(this.note["cur"])
                }
                if (syntaxes[0] == "qrt") {
                    return
                }
                if (syntaxes[0] == "crd") {
                    console.log("Everything was made by Ry2110 :D")
                }
                this.main()
            } else {
                return
            }
        } else {
            console.log("Please set your user name before enter the main code.")
            this.main()
        }
    }
}

function Dazh(syntaxes) {
    OS.run(OS.tokenize(syntaxes))
}

/*OS.run(OS.tokenize("usr ry2110"))
OS.run(OS.tokenize("dev el = 1"))
OS.run(OS.tokenize("prt el"))
OS.run(OS.tokenize("chk"))*/

console.log("Dazh ("+OS.version+")")

OS.main()