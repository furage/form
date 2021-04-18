(function(){
    (function(){
        var e = document.createElement("script");
        e.setAttribute("src","https://code.jquery.com/jquery-1.9.1.js");
        document.body.append(e);
    })();
    jQuery.noConflict();
    (function($) {
        function getCSS(src){
            $('<link>').attr({
                type: 'text/css',
                rel: 'stylesheet',
                href: src
            }).appendTo('head');
        }
        getCSS("https://furage.github.io/form/chat/res.css");
        window.showChat = function(){
            $.get("https://kyota.blog.jp/lite/archives/8461595/comments/1017765/").done(function(body){
                const list = [],
                      m = body.match(/<aside id="comment-v2"(.|\n)+?<\/aside>/);
                if(!m) throw "aside";
                $(replaceStr(m[0], replaceHTML)).find(".comment-list").each(function(i,e){
                    const elm = $(e).find(".comment-id"),
                          id = Number(elm.text().slice(0,-1)),
                          name = trim(elm.next().text()),
                          time = $(e).find("time").text(),
                          text = trim($(e).find(".comment-body").text());
                    list.push([ id, name, text, time ]);
                });
                drawDOM(list.sort(function(e1,e2){
                    return e1[0] < e2[0] ? 1 : e1[0] > e2[0] ? -1 : 0;
                }));
            });
        };
        const replaceHTML = [
            [ /^(.|\n)*?<\/head>/, '' ],
            [ /<script(.|\n)*?<\/script>/g, '' ],
            [ /<iframe.*?<\/iframe>/g , ''],
            [ /<\?.*?\?>/g, '' ],
            [ /src=".*?"/g, '' ],
            [ /href=".*?"/g, '' ],
        ];
        function replaceStr(str, list){ // 文字列置換
            let s = str;
            list.forEach(function(list){
                const f = list[1];
                s = s.replace(list[0], typeof f === "function" ? function(v){
                    return f(v);
                } : f );
            });
            return s;
        }
        function trim(str){
            return str.replace(/^\s+/, '').replace(/\s+$/, '');
        }
        function drawDOM(list){
            const hChat = $("#chat").empty();
            list.forEach(function(arr){
                const id = arr[0],
                      name = arr[1],
                      text = arr[2],
                      time = arr[3];
                const h = $("<div>").appendTo(hChat);
                $("<span>").appendTo(h).text(id + '.').addClass("id");
                $("<span>").appendTo(h).text(name).addClass("name");
                $("<span>").appendTo(h).text(text).addClass("text");
                $("<span>").appendTo(h).text('(' + time + ')').addClass("time");
            });
        }
    })(jQuery);
})();
