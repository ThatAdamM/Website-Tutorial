// Set our async function to load when the HTML ready
// The async stands for asynchronously - This allows for us to
// pause the function whilst parts are completed. 
window.onload = async function () {
    // Grab our <span> element using the ID we got earlier.
    // NOTE: In HTML IDs can only be matched to one element,
    // otherwise we get errors :)
    let counterElement = document.getElementById("count");
  
    // Now we need to make the request to our /counter endpoint!
    // We use a built-in function called "fetch()" to do this
    // Since it takes some time, we add the "await" on, which the "async" above allows us to do.
    let response = await fetch("/counter");
  
    // We have a response, but we need the data we sent!
    // To get it, we use the response.text() which needs an await
    let visitCount = await response.text();
  
    // Awesome! We now have the number in our visitCount variable!
    // Now we need to display it. We can set it as the text inside
    // the <span> variable we got earlier!
  
    // innerText is a property (like a variable), 
    // so we set it with an equals sign
    counterElement.innerText = visitCount;
  }