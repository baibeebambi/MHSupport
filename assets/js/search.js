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
    more relevant to the user. Shows actualq with a.

    If not found, display text to show a list of questions instead.
    */
    var questions = [
        {
            actualq: 'How can I create a server?',
            q: ['how can i create a server', 'how to make server', 'server make', 'make a server', 'create a server', 'die tqnk'],
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
            keywords: ['world', 'download', 'file']
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