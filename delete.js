(function(){
    (function(){
        var e = document.createElement("script");
        e.setAttribute("src","https://code.jquery.com/jquery-1.9.1.js");
        document.body.appendChild(e);
    })();
    jQuery.noConflict();
    (function($) {
        var cnt = 0;
        function f(){
            if(cnt++ === 1) main($);
        }
        $.getScript("https://furage.github.io/article/adblock.js");
        $.getScript("https://yaju1919.github.io/lib/lib/yaju1919.js", f);
        $(document).on('ready', f);
    })(jQuery);
    function main($){
        var startFlag = false;
        var h = $("#form");
        var inputUrl = yaju1919.addInputText(h,{
            id: "inputUrl",
            title: "記事のURL",
            width: "70%",
            change: function(s){
                var m = s.match(/https?:\/\/[\w\/:%#\$&amp;\?\(\)~\.=\+\-]+/);
                if(startFlag) $("#inputUrl").css({backgroundColor:m?"white":"pink"});
                return m ? m[1] : '';
            },
        });
        h.append("<br>");
        var inputText = yaju1919.addInputText(h,{
            title: "削除の理由",
            textarea: true,
            width: "70%",
            height: "100",
        });
        h.append("<br>");
        var hBtn = $("<div>").appendTo(h).css({
            textAlign:"center"
        });
        $("<button>").appendTo(hBtn).text("送信").css({
            width: 100,
            height: 50
        }).on("click touchstart",function(){
            var url = inputUrl(),
                text = inputText();
            if(!url) return msg.text("※記事のURLの入力は必須です。");
            send(["◆該当記事URL",url,"◆理由",text].map(function(v,i){
                return i % 2 ? "```" + v.replace(/`/g,'') + " ```" : v;
            }).join('\n'));
            $("<div>").appendTo($("#form").empty()).text("削除依頼を受け付けました。").css({color:"red"});
        });
        var msg = $("<div>").appendTo(h);
        function send(content){
            var data = {
                "username": '',
                "avatar_url": '',
                content: "@everyone\n" + content,
                tts: false
            };
            var xhr = new XMLHttpRequest();
            xhr.open( 'POST', "https://discord.com/api/webhooks/880777512894996511/X-6IjS7NJgxUDW29pqvz-o2cGVyJEiGEawXQzWhYJ3QPn833UFXNQbrN3EQ01dAmf5DZ" );
            xhr.setRequestHeader( "content-type", "application/json" );
            xhr.send(JSON.stringify(data));
        }
        startFlag = true;
    }
})();
