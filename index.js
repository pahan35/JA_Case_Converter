function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

const textarea = document.querySelector('textarea');
textarea.value = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
    ' Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,' +
    ' when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
document.getElementById('upper-case').addEventListener('click', () => {
  textarea.value = textarea.value.toUpperCase()
});
document.getElementById('lower-case').addEventListener('click', () => {
  textarea.value = textarea.value.toLowerCase()
});
document.getElementById('proper-case').addEventListener('click', () => {
  textarea.value = textarea.value
      .split(/\s/)
      .filter(part => part?.length)
      .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase()).join(' ')
});
document.getElementById('sentence-case').addEventListener('click', () => {
  textarea.value = textarea.value
      .split(/\./)
      .map((part) => {
        if (part.length === 0) {
          return part
        }
        const match = part.match(/\w/)
        const converted = part.toLowerCase()
        if (!match) {
          return converted;
        }
        const letters = converted.split('');
        const {index} = match
        letters[index] = part[index].toUpperCase();
        return letters.join('');
      }).join('.')
});

document.getElementById('save-text-file').addEventListener('click', () => {
    download('text.txt', textarea.value)
})
