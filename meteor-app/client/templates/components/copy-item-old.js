Template.copyItemOld.helpers({
    getCopyRaw: function(copy, lang) {
        if (copy[lang] && copy[lang].val) return copy[lang].val;
        return "";
    },
    getCopy: function(copy, lang) {
        var data = "";

        if (copy[lang] && copy[lang].val) data = copy[lang].val;

        //nl2br
        data = (data + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
        return new Spacebars.SafeString(data);
    },
    getTextareaState: function(copy, lang) {
        if (!copy[lang] || !copy[lang].val) return "empty";
    },
    getDiffText: function(copy, lang) {
        if (!copy[lang]) return "";

        var previousVal = copy[lang].previousVal,
            val = copy[lang].val,
            diff = null,
            diffText = [];

        if (previousVal.localeCompare(val) === 0) return val;

        diff = JsDiff.diffChars(previousVal, val);

        diff.forEach(function(part){
            var diffClass = "";

            if (part.added) diffClass = "blue lighten-4 added";
            if (part.removed) diffClass = "red lighten-4 removed";
            diffText.push("<span class=" + diffClass + ">" + part.value + "</span>");
        });

        return diffText.join('');
    }
});