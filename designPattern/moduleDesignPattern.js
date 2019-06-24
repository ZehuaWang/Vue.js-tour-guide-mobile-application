var HTMLChanger = (
    function() {
        var contents = 'contents';

        var changeHTML = function() {
            var el = 'othercontents';
            el = contents;
        }

        return {
            callChangeHTML: function() {
                changeHTML();
                console.log(contents);
            }
        }
    }
)();

HTMLChanger.callChangeHTML();
console.log(HTMLChanger.contents);
