function main() {

    function findAnagrams(text) {
        return [text];  // TODO
    }

    var input = document.getElementById('input');
    var button = document.getElementById('button');
    var output = document.getElementById('output');

    function clearOutput() {
        while (output.firstChild)
            output.removeChild(output.firstChild);
    }

    function submit() {
        clearOutput();
        var anagrams = findAnagrams(input.value);
        for (var i = 0; i < anagrams.length; ++i) {
            var item = document.createElement('li');
            item.innerText = anagrams[i];
            output.appendChild(item);
        }
    }

    button.onclick = submit;

    input.onkeypress = function (evt) {
        if (evt.keyCode === 13) // Proceed only on Enter press.
            submit();
    };
}
