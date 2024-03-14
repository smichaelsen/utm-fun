function getRandomArrayEntry(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getKey() {
  return getRandomArrayEntry([
    'utm_adset',
    'utm_audience',
    'utm_campaign',
    'utm_campaignid',
    'utm_cid',
    'utm_click',
    'utm_content',
    'utm_device',
    'utm_intent',
    'utm_interaction',
    'utm_keyword',
    'utm_medium',
    'utm_name',
    'utm_nooverride',
    'utm_objective',
    'utm_phase',
    'utm_placement',
    'utm_pubreferrer',
    'utm_reader',
    'utm_social',
    'utm_source',
    'utm_swu',
    'utm_target',
    'utm_term',
    'utm_type',
    'utm_vid',
  ]);
}

function getValue() {
  return getRandomArrayEntry([
    '6248',
    'BT',
    'KTX24-1',
    'Video',
    'WG',
    'ad',
    'advert',
    'awareness',
    'banner',
    'bottom-bar',
    'cta',
    'desktop',
    'direct',
    'display',
    'diverse',
    'email',
    'exit-intent',
    'fast',
    'footer',
    'interstitial',
    'mobile',
    'modal',
    'newsletter',
    'organic',
    'overlay',
    'paid',
    'popup',
    'promotion',
    'referral',
    'saved-audience',
    'sidebar',
    'slow',
    'social',
    'tablet',
    'top-bar',
  ]);
}

function modifyUrl(url) {
  // Find all instances of UTM parameters in the URL
  const utmRegex = /(utm_[a-zA-Z_]+)=([a-zA-Z0-9_\-\.]*)/g;

  // This will hold the modified URL
  let modifiedUrl = url;

  // Replace each UTM parameter found
  modifiedUrl = modifiedUrl.replace(utmRegex, function(match, p1, p2) {
    return `${getKey()}=${getValue()}`;
  });
  console.log(`Had fun with ${url} and got ${modifiedUrl}`);
  return modifiedUrl;
}

const observerCallback = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1 && node.tagName === 'A') { // Check if the node is an element and is an <a> tag
          const aElement = node;
          if (aElement.href && new URL(aElement.href).searchParams.toString().includes('utm_')) {
            aElement.href = modifyUrl(aElement.href); // Modify the href of the <a> tag
          }
        }
      });
    }
  }
};

// Options for the observer (which mutations to observe)
const observerOptions = {
  childList: true,
  subtree: true // Observe the additions of new elements inside of the entire document
};

// Create a MutationObserver instance and start observing
const observer = new MutationObserver(observerCallback);
observer.observe(document.body, observerOptions);
