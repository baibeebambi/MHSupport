$(document).ready(() => {
    var used = 0;
    /*
    Searcher:
    First, takes input from search box
    Removes question marks and toLowercase.
    Sees if the question has a substring
    of the q properties in the questions array
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
            q: ['create a server', 'make server', 'server make', 'make a server', 'create a server', 'create server'],
            a: 'Head over to the <a href="https://www.minehut.com" target=_blank>minehut.com</a> website! Then create an account, and boom, there\'s your server!',
            keywords: ['create', 'make', 'start', 'begin', 'help']
        },
        {
            actualq: 'How do I get OP on my server?',
            q: ['no commands', 'need op', 'no permissions', 'get permissions'],
            a: 'In the <a href="https://www.minehut.com" target=_blank>minehut.com</a> panel, locate the Console, and type in \'op (your username)\'',
            keywords: ['op', 'commands', 'permissions', 'permission', 'help', 'command', 'creative']
        },
        {
            actualq: 'How can I download my world?',
            q: ['download world', 'download my world', 'my world', 'get world', 'world file'],
            a: 'Just do <em>/dl world</em> on your server!',
            keywords: ['world', 'download', 'file', 'help']
        },
        {
            actualq: 'Why does tqnk smell like ass?',
            q: ['tqnk ass', 'wtf is tqnk', 'why does tqnk smell like ass', 'smelly tqnk', 'tqnk so bad'],
            a: 'We don\'t really know to be honest. He does smell really bad though..',
            keywords: ['tqnk', 'smell', 'putrid', 'wtf']
        },
        {
            actualq: 'Can I make my server accept versions before 1.12?',
            q: ['before 1.12', 'other versions', 'accept other versions', 'change versions', 'change version'],
            a: 'Yep! Just install the plugin <strong>ProtocolSupport!</strong>',
            keywords: ['1.8', '1.9', '1.10', '1.11', 'version', 'versions', 'change', 'protocol', 'help']
        },
        {
            actualq: 'Can I make my server private?',
            q: ['server private', 'private server'],
            a: 'Yep! Just do the command <em>/whitelist on</em>! You can add friends of yours using /whitelist add (username)! It is also possible to make your server "unlisted". This will prevent it from appearing in the Minehut Server list. This can be found in the panel. <br><img class="img-responsive" src="./assets/img/unlisted.png"><br>',
            keywords: ['whitelist', 'help', 'private', 'friends']
        },
        {
            actualq: 'How can I upload a world to Minehut?',
            q: ["upload world", 'upload a world', 'how to upload world', 'upload world'],
            a: 'Yes, just follow these steps!:<br>1) Zip all the world files inside of the folder into 1 zip file.<br>2) Upload the zip to https://file.io/ or any other online file hosting.<br>3) Click the Copy Link button on file.io or on any other host, get a direct download link to that file.<br>4) On your server, do the command /ul world name link After its uploaded, you can teleport to it using /world [Name].',
            keywords: ['upload', 'world', 'help', 'file']
        },
        {
            actualq: 'How do I turn on keepInventory in my server?',
            q: ['keepinventory on', 'turn on keepinventory', 'keepinventory true'],
            a: 'Just do <strong>/gamerule keepInventory true</strong> on your server!',
            keywords: ['keepinventory', 'gamerule', 'help']
        },
        {
            actualq: 'How do I install plugins in my server?',
            q: ['get plugins', 'install plugins', 'need mods', 'get mods', 'need plugins'],
            a: 'Just click on the \'Plugins\' tab on the <a href="https://www.minehut.com" target=_blank>minehut.com</a> panel! There, you can click to install plugins. You will need to restart your server for the changes to take place.',
            keywords: ['install', 'plugins', 'plugin', 'get', 'mods', 'mod', 'help']
        },
        {
            actualq: 'How can I change the type of my world (flat, etc.)?',
            q: ['world superflat', 'world flat', 'server flat', 'flat server', 'flat world', 'superflat world'],
            a: 'Head over to your <strong>Server properties</strong> and set the world type to <strong>flat!</strong> After you have done this, head over to <strong>World Settings</strong> and click \'Reset World\'. You will need to restart your server for changes to take effect.',
            keywords: ['superflat', 'flat', 'custom', 'world', 'type', 'help']
        },
        {
            actualq: 'How can I get more player slots on my server?',
            q: ['more players', 'more player', 'more slots', 'more slot'],
            a: 'You will need to purchase credits in order to get more player slots for your server. This can be found at <a href="https://www.minehut.com/credits" target=_blank>minehut.com/credits</a>. Afterwords, head over to your server properties and set the player slot count to whatever you would like!',
            keywords: ['players', 'slots', 'slot', 'player', 'help', 'player', 'slot']
        },
        {
            actualq: 'My server has <> as prefixes? How can I customize my prefixes?',
            q: ['need prefixes', 'change prefix', 'change prefixes'],
            a: 'This can be found in #faq in the Minehut discord.',
            keywords: ['<>', 'prefix', 'prefixes', 'suffix', 'suffixes', 'help']
        },
        {
            actualq: 'How can I make a minigame queue?',
            q: ['need queue', 'make queue', 'make a queue', 'create a queue'],
            a: 'Ask <strong>Vocall</strong> (Minehut Player) in /msg. He\'ll help you.',
            keywords: ['queue', 'crazycow30', 'vocall', 'minigame', 'backyardigans']
        },
        {
            actualq: 'Need help making a website?',
            q: ['need website', 'get website', 'website help', 'help website'],
            a: 'Razviti (Discord: @Raz#1720) can help ya. He likes to create websites for people for free!',
            keywords: ['razviti', 'raz', 'website']
        }
    ];

    $(document).ready(function(){
        $('#frm').keypress(function(e){
            if(e.keyCode==13) {
                $('.sbtn').click();
            }
        });
    });

    $('.sbtn').click(function submit() {
        $('.subres').html('');
        if(used > 0) {
            var parent = document.getElementById("master")
            var child = document.getElementById("vocall")
            parent.removeChild(child);
        }
        var good = [];
        var inp = $('.inp').val();
        inp = inp.toLowerCase();
        inp = inp.replace(/[-\/\\^$*+@#%&=+_`~<>,?.()|![\]{}]/gi, "");
        if(inp.length <= 0) {
            console.log('no');
            noin();
            $('.trans:first').before('<div class="allaq" id="vocall"></div>');
        } else {
            used = 1;
            for(var z = 0; z < questions.length; z++) {
                for (var y = 0; y < questions[z].q.length; y++) {

                    if(inp.indexOf(questions[z].q[y]) !== -1) {
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
            $("html, body").animate(
                { scrollTop: $('#vocall').offset().top }
            , 1000);

        }
    });

    function noin() {
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    };

});
