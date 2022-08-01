let quotesData = [];
let colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857',
];

const getQuotes = () => {
  return $.ajax({
    headers: {
      Accept: 'application/json',
    },
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: (response) => {
      if (typeof response === 'string') quotesData = JSON.parse(response);
    },
  });
};

const getRandomQuote = () => {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
};

// const setQuote = (_quotes) => {
//   const index = Math.round(Math.random() * 100);
//   const selectedQuote = _quotes[index];

//   $('#text').empty().append(document.createTextNode(selectedQuote.quote));
//   $('#author').empty().append(document.createTextNode(selectedQuote.author));
//   return selectedQuote;
// };

// const setColor = (_colors) => {
//   const index = Math.round(Math.random() * 10);
//   const selectedColor = _colors[index];

//   $('body').css('background-color', selectedColor);
//   $('.btn').css('background-color', selectedColor);
//   $('.text-color').css('color', selectedColor);
// };

const getQuote = (_quotesData) => {
  console.log(getRandomQuote());
  let randomQuote = getRandomQuote();
  let currentQuote = randomQuote.quote;
  let currentAuthor = randomQuote.author;

  // setColor(colors);
  // let currentQuote = setQuote(_quotesData.quotes);

  // $('#new-quote').click(() => {
  //   currentQuote = setQuote(_quotesData.quotes);
  //   // setColor(colors);
  // });

  $('#tweet-quote').attr(
    'href',
    `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
      `"${currentQuote}" - ${currentAuthor}`
    )}`
  );

  $('#tumblr-quote').attr(
    'href',
    `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption==${encodeURIComponent(
      currentQuote
    )}&content=${encodeURIComponent(
      currentAuthor
    )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`
  );

  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(currentQuote);
  });

  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').text(currentAuthor);
  });

  const color = Math.floor(Math.random() * colors.length);

  $('html body').animate(
    {
      backgroundColor: colors[color],
      color: colors[color],
    },
    1000
  );

  $('.button').animate(
    {
      backgroundColor: colors[color],
    },
    1000
  );
};

$(function () {
  getQuotes().then(() => {
    if (quotesData) {
      getQuote(quotesData);
    }
  });

  $('#new-quote').on('click', getQuote);
});
