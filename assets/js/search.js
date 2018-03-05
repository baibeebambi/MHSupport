$(document).ready(() => {
    var used = 0;
    /*
    Searcher:
    First, takes input from search box
    Removes question marks and toLowercase.
    Sees if the question has any perfect matches with 'q'
    in the q properties in the questions array
    if not loop through each word in the user inputted question
    to see if it matches any of the keywords

    Display the results with q: matched results having top priorities
    keywords: being 2nd, since a perfect question match would be
    more relevant to the user. Shows actualq with a. Makes sure
    there are no repeat results (unique array)

    If not found, display text to show a list of questions instead.
    */
    var questions = [
        {
            actualq: 'How can I create a server?',
            q: ['how can i create a server', 'how to make server', 'server make', 'make a server', 'create a server'],
            a: 'Head over to the <a href="https://www.minehut.com" target=_blank>minehut.com</a> website! Then create an account, and boom, there\'s your server!',
            keywords: ['create', 'make', 'start', 'begin', 'help']
        },
        {
            actualq: 'How do I get OP on my server?',
            q: ['how can i do commands', 'need op', 'no permissions', 'how can i get permissions'],
            a: 'In the <a href="https://www.minehut.com" target=_blank>minehut.com</a> panel, locate the Console, and type in \'op (your username)\'',
            keywords: ['op', 'commands', 'permissions', 'help']
        },
        {
            actualq: 'How can I download my world?',
            q: ['download world', 'can i download my world', 'how can i download my world', 'get world', 'world file'],
            a: 'Just do <em>/dl world</em> on your server!',
            keywords: ['world', 'download', 'file', 'help']
        },
        {
            actualq: 'Why does tqnk smell like ass?',
            q: ['tqnk ass', 'wtf is tqnk', 'why does tqnk smell like ass', 'smelly tqnk boi', 'why is tqnk so bad'],
            a: 'We don\'t really know to be honest. He does smell really bad though..',
            keywords: ['tqnk', 'smell', 'putrid', 'wtf']
        },
        {
            actualq: 'Can I make my server accept versions before 1.12?',
            q: ['before 1.12', 'other versions', 'can i make my server accept versions before 1.12', 'change versions', 'change version'],
            a: 'Yep! Just install the plugin <strong>ProtocolSupport!</strong>',
            keywords: ['1.8', '1.9', '1.10', '1.11', 'version', 'versions', 'change', 'protocol', 'help']
        },
        {
            actualq: 'Can I make my server private?',
            q: ['can i make my server private', 'private server'],
            a: 'Yep! Just do the comamnd <em>/whitelist on</em>! You can add friends of yours using /whitelist add (username)! It is also possible to make your server "unlisted". This will prevent it from appearing in the Minehut Server list. This can be found in the panel. <br><img src="./assets/img/unlisted.png"><br>',
            keywords: ['whitelist', 'help', 'private', 'friends']
        },
        {
            actualq: 'How can I upload a world to Minehut?',
            q: ['need to upload world', "upload world", 'can i upload a world', 'how to upload world', "how can i upload a world to minehut", 'upload world to minehut', 'can i upload world to minehut', 'how to upload world', 'how to upload world to minehut'],
            a: 'Yes, just follow these steps!:<br>1) Zip all the world files inside of the folder into 1 zip file.<br>2) Upload the zip to https://file.io/ or any other online file hosting.<br>3) Click the Copy Link button on file.io or on any other host, get a direct download link to that file.\n4) On your server, do the command /ul world name link After its uploaded, you can teleport to it using /world [Name].',
            keywords: ['upload', 'world', 'help', 'file']
        },
        {
            actualq: 'How do I turn on keepInventory in my server?',
            q: ['how do i turn on keepinventory in my server', 'turn on keepinventory', 'can i turn on keepinventory in my server'],
            a: 'Just do <strong>/gamerule keepInventory true</strong> on your server!',
            keywords: ['keepinventory', 'gamerule', 'help']
        }
    ];

    $('.sbtn').click(() => {
        $('.subres').html('');
        if(used > 0) {
            var parent = document.getElementById("master")
            var child = document.getElementById("vocall")
            parent.removeChild(child);
        }
        var good = [];
        var inp = $('.inp').val();
        inp = inp.toLowerCase();
        inp = inp.replace(/\?/gi, "");
        if(inp.length <= 0) {
            console.log('no');
            noin();
            $('.trans:first').before('<div class="allaq" id="vocall"></div>');
        } else {
            used = 1;
            for(var z = 0; z < questions.length; z++) {
                for (var y = 0; y < questions[z].q.length; y++) {

                    if(inp === questions[z].q[y]) {
                        good.push(z);
                    };
                    
                }
            }

            var words = inp.split(" ");

loop1:
            for(var zb = 0; zb < questions.length; zb++) {
loop2:
                for (var yb = 0; yb < questions[zb].keywords.length; yb++) {
loop3:
                    for (var xb = 0; xb < words.length; xb++) {
                        console.log(words[xb]);
                        console.log(questions[zb].keywords[yb])

                        if(words[xb] === questions[zb].keywords[yb]) {
                            console.log('success!')
                            good.push(zb);
                            console.log(zb);
                            if(zb >= questions.length) {
                                break loop1;
                            }
                        };
                    }   
                }
            }

            

            if(good.length <= 0) {
                var nores = '<div class="row container" style="color: black !important; padding-top: 20px; padding-bottom: 40px;"><div class="col-sm-10 col-sm-offset-2"><div class="card"><div class="card-block"><h2>No results!</h2><p>You can look in our list of questions for further assistance, or ask the support team!</p></div></div></div></div><span class="trans"></span>'
                $('.trans:first').before('<div class="allaq" id="vocall"></div>');
                $('.allaq').html(nores)
                $('.subres').html('Found no results. ;(');
            } 
            if(good.length > 0) {
                var htadd;
                console.log(good);
                var uniqueVals = [];
                $.each(good, function(i, el){
                    if($.inArray(el, uniqueVals) === -1) uniqueVals.push(el);
                });
                console.log(uniqueVals);
                $('.subres').html('Found ' + uniqueVals.length + ' result(s)!');
                uniqueVals.forEach(function(item, index) {
                    var insert = '<div class="row container" style="color: black !important; padding-top: 20px; padding-bottom: 40px;"><div class="col-sm-10 col-sm-offset-2"><div class="card"><div class="card-block"><h2>' + questions[item].actualq + '</h2><p>' + questions[item].a + '</p></div></div></div></div><span class="trans"></span>'
                    htadd += insert;
                });
            }
            $('.trans:first').before('<div class="allaq" id="vocall"></div>');
            $('.allaq').html(htadd)

        }
    });

    function noin() {
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    };

});
