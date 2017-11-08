Anagram.main = function main() {

    function normalize(text) {
        return (text
            .replace(/[\W0-9_]/g, '')
            .toLowerCase()
            .split('')
            .sort()
            .join(''));
    }

    var words = Anagram.words;
    var norms = words.map(normalize);

    function minus(s, t) {  // s and t must be normalized strings.
        var r = '';
        var i = 0, m = s.length;
        var j = 0, n = t.length;
        while (i < m && j < n) {
            var e = s.indexOf(t[j], i);
            if (e === -1)
                return null;
            r += s.substring(i, e);
            i = e + 1;
            ++j;
        }
        return j === n ? r + s.substring(i, m) : null;
    }

    function findAnagrams(text) {
        var memo = {};
        function imp(s, j) {    // j is an offset into `words`
            var memoKey = [s, j].toString();
            if (memo.hasOwnProperty(memoKey))
                return memo[memoKey];
            var r = [];
            if (s !== '' && j !== words.length) {
                var d = minus(s, norms[j]);
                if (d === '') {                     // with word
                    r.push(words[j])
                } else if (d) {
                    var w = words[j];
                    imp(d, j + 1).forEach(function (s) {
                        r.push(w + ' ' + s);
                    });
                }
                r = r.concat(imp(s, j + 1));        // without word
            }
            memo[memoKey] = r;
            return r;
        }
        var s = normalize(text);
        return s ? imp(s, 0) : [];
    }

    var input = document.getElementById('input');
    var button = document.getElementById('button');
    var output = document.getElementById('output');

    function clearOutput() {
        while (output.firstChild)
            output.removeChild(output.firstChild);
    }

    function setOutput(elem) {
        clearOutput();
        output.appendChild(elem);
    }

    function submit() {
        setOutput(document.createTextNode('...'));
        window.setTimeout(function () {
            var t = new Date;
            var anagrams = findAnagrams(input.value);
            console.log(new Date - t);
            if (anagrams.length === 0) {
                var elem = document.createElement('i');
                elem.style.color = 'black';
                elem.innerText = "I got nothin'.";
                setOutput(elem);
            } else {
                var list = document.createElement('ul');
                for (var i = 0; i < anagrams.length; ++i) {
                    var item = document.createElement('li');
                    item.innerText = anagrams[i];
                    list.appendChild(item);
                }
                setOutput(list);
            }
        }, 0);
    }

    button.onclick = submit;

    input.onkeypress = function (evt) {
        if (evt.keyCode === 13) // if the 'Enter' key was pressed
            submit();
        return true;
    };
}
