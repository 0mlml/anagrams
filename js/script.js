let mode = document.getElementById('modeSwitch').checked ? 'strict' : 'lax';

const canFormWord = (word, letters) => {
  const lettersCount = Array(26).fill(0);

  for (let i = 0; i < letters.length; i++) {
    lettersCount[letters.charCodeAt(i) - 'a'.charCodeAt(0)]++;
  }

  for (let i = 0; i < word.length; i++) {
    if (--lettersCount[word.charCodeAt(i) - 'a'.charCodeAt(0)] < 0) {
      return false;
    }
  }

  return true;
}

const compareLength = (a, b) => b.length - a.length;

const update = () => {
  const letters = document.getElementById('letters').value.toLowerCase();

  const wordlist = mode === 'lax' ? laxWords : strictWords;

  const results = wordlist.filter((word) => canFormWord(word, letters));
  results.sort(compareLength);

  document.getElementById('results').innerHTML = '';

  if (results.length === 0) {
    const result = document.createElement('div');
    result.classList.add('result');
    result.innerText = 'No results found';
    return;
  }

  for (let i = results[0].length; i > 2; i--) {
    if (results.filter((word) => word.length === i).length === 0) {
      continue;
    }
    const resultTitle = document.createElement('div');
    resultTitle.classList.add('result-title');
    resultTitle.innerText = `${i} letter words:`;
    document.getElementById('results').appendChild(resultTitle);
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');
    resultDiv.innerText = results.filter((word) => word.length === i).join(' ');
    document.getElementById('results').appendChild(resultDiv);
  }
}

let changeTimeout = null;
document.getElementById('letters').addEventListener('input', () => {
  if (changeTimeout !== null) {
    clearTimeout(changeTimeout);
  }

  changeTimeout = setTimeout(update, 300);
});

document.getElementById('modeSwitch').addEventListener('change', () => {
  mode = document.getElementById('modeSwitch').checked ? 'strict' : 'lax';
  update();
});