function wrapInsideDiv(){
    while($("#container>img").length > 0){
        var images = Math.floor(Math.random() * 4) + 1;
        var div = $("<div/>");
        $("#container").append(div);
        $("#container>img").each(function(index, elem){
            if(index + 1 < images){
             $(elem).appendTo(div);
            }
        });
    }
}
wrapInsideDiv();