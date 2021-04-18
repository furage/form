(function(){
    (function(){
        var e = document.createElement("script");
        e.setAttribute("src","https://code.jquery.com/jquery-1.9.1.js");
        document.body.append(e);
    })();
    jQuery.noConflict();
    (function($) {
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
                    list.push({ id, name, text, time });
                });
                drawDOM(list.sort(function(e1,e2){
                    return e1.id < e2.id ? 1 : e1.id > e2.id ? -1 : 0;
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
            const h = $("#chat").empty();
            list.forEach(function(obj){
                $("<div>").appendTo(h).text(Object.keys(obj).map(function(v,i){
                    const a = obj[v];
                    switch(i){
                        case 0: return a + '.';
                        case 1: return a + '：';
                        case 2: return a;
                        case 3: return '(' + a + ')';
                    }
                }).join(' '));
            });
        }
    })(jQuery);
})();
