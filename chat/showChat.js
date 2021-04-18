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
                var list = [],
                    m = body.match(/<aside id="comment-v2"(.|\n)+?<\/aside>/);
                if(!m) throw "aside";
                var times = [];
                $(replaceStr(m[0], replaceHTML)).find(".comment-list").each(function(i,e){
                    var elm = $(e).find(".comment-id"),
                        id = Number(elm.text().slice(0,-1)),
                        name = trim(elm.next().text()),
                        text = trim($(e).find(".comment-body").text()),
                        time = new Date($(e).find("time").text().replace(/[年月日]/g,'/')).getTime();
                    while(times.indexOf(time) !== -1) time++;
                    times.push(time);
                    list.push([ id, name, text, time ]);
                });
                drawDOM(list.sort(function(e1,e2){
                    return e1[3] < e2[3] ? 1 : e1[3] > e2[3] ? -1 : 0;
                }));
            });
        };
        var replaceHTML = [
            [ /^(.|\n)*?<\/head>/, '' ],
            [ /<script(.|\n)*?<\/script>/g, '' ],
            [ /<iframe.*?<\/iframe>/g , ''],
            [ /<\?.*?\?>/g, '' ],
            [ /src=".*?"/g, '' ],
            [ /href=".*?"/g, '' ],
        ];
        function replaceStr(str, list){ // 文字列置換
            var s = str;
            list.forEach(function(list){
                var f = list[1];
                s = s.replace(list[0], typeof f === "function" ? function(v){
                    return f(v);
                } : f );
            });
            return s;
        }
        function trim(str){
            return str.replace(/^\s+/, '').replace(/\s+$/, '');
        }
        var hChat = $("#chat"),
            lastTime = 0;
        function drawDOM(list){
            var nowTime = list[0][3];
            if(nowTime <= lastTime) return;
            list.filter(function(arr){
                return arr[3] > lastTime;
            }).reverse().forEach(function(arr){
                var id = arr[0],
                    name = arr[1],
                    text = arr[2],
                    time = arr[3];
                var h = $("<div>").prependTo(hChat);
                $("<span>").appendTo(h).text(id + '．').addClass("id");
                $("<span>").appendTo(h).text(name + '：').addClass("name");
                $("<span>").appendTo(h).text(text).addClass("text");
                $("<span>").appendTo(h).text(purseTime(time)).addClass("time");
            });
            lastTime = nowTime;
        }
        function purseTime(time){
            var d = new Date(time),
                s = (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + ('0' + d.getMinutes()).slice(-2);
            return '（' + s + '）';
        }
    })(jQuery);
})();
