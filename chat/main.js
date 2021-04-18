(function(){
    (function(){
        var e = document.createElement("script");
        e.setAttribute("src","https://code.jquery.com/jquery-1.9.1.js");
        document.body.append(e);
    })();
    jQuery.noConflict();
    (function($) {
        var cnt = 0;
        function f(){
            if(cnt++ === 2) main($);
        }
        $.getScript("https://furage.github.io/article/adblock.js");
        $.getScript("https://yaju1919.github.io/lib/lib/yaju1919.js", f);
        $.getScript("https://furage.github.io/form/chat/showChat.js", f);
        $(document).on('ready', f);
    })(jQuery);
    function main($){
        setInterval(window.showChat, 1000);
        $(".listWithImage,.article-footer,.article-sub-category").remove();
        $("#article-contents").parent().children().each(function(i,e){
            if(i) $(e).remove();
        });
        $("#comments,.comment-v2").remove();
        var h = $("<div>").appendTo("#form");
        var inputName = yaju1919.addInputText(h,{
            id: "inputName",
            title: "名前",
            placeholder: "きょーた",
            value: $("#comment-form-author").val() || $("#author").val(),
            hankaku: false
        });
        var inputText = yaju1919.addInputText(h,{
            id: "inputText",
            title: "本文",
            placeholder: "Enterで送信",
            width: "90%",
            hankaku: false
        });
        $("#inputText").on("keypress", function(e){
            if(e.key === "Enter") send();
        });
        h.append("<br>");
        var hBtn = $("<div>").appendTo(h).css({
            textAlign:"center"
        });
        var btn = $("<button>").appendTo(hBtn).text("投稿").css({
            width: 100,
            height: 50
        }).on("click", send);
        $("<span>").appendTo(hBtn).text("　");
        var btn2 = $("<button>").appendTo(hBtn).text("返信").css({
            width: 100,
            height: 50
        }).on("click", function(){
            var e = $("#inputText");
            if(/>>/.test(e.val())) return e.focus();
            e.val(">>" + window.lastId + "\n" + e.val()).focus();
        });
        function disabled(bool){
            btn.add(btn2).add("#inputName,#inputText").attr("disabled", bool);
        }
        function send(){
            if(!inputName() || !inputText()) return;
            disabled(true);
            $.post("https://comment.blogcms.jp/livedoor/furage/8461595/post",{
                author: inputName(),
                body: inputText(),
                rating: "",
                rating_icon: "star",
                cookie: "on"
            }).always(function(){
                disabled(false);
                $("#inputText").val('').focus();
            });
        }
    }
})();
