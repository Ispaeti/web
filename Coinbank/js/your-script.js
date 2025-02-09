// Check if MetaMask is installed and connected
if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {

  const disconnectButton = document.getElementById('disconnectButton'); // Get your disconnect button

  disconnectButton.addEventListener('click', async () => {
    try {
      // EIP-1193 standard way to disconnect (preferred)
      await window.ethereum.request({ method: 'eth_requestAccounts' }); // Re-prompts the user to connect
      await window.ethereum.request({ method: 'eth_accounts' }); // Gets the accounts (should be empty after disconnect)

      // Older way (might not be supported by all providers) - less recommended
      // await window.ethereum.request({ method: 'eth_disconnect' }); // If available


      // Remove any stored connection information (if you're using localStorage or similar)
      localStorage.removeItem('connectedWallet'); // Example - adapt to your storage

      // Update the UI to reflect disconnection
      updateUI(); // Function to update button state, hide account info, etc.

      console.log('MetaMask disconnected');
    } catch (error) {
      console.error('Error disconnecting MetaMask:', error);
      // Handle errors (e.g., display a message to the user)
    }
  });

} else {
  console.log('MetaMask is not installed.');
  // Handle the case where MetaMask is not available
}

function updateUI() {
  const connectButton = document.getElementById('connectButton');
  const disconnectButton = document.getElementById('disconnectButton');
  const accountInfo = document.getElementById('accountInfo'); // Element to display account info

  if (localStorage.getItem('connectedWallet')) {
    connectButton.style.display = 'none';
    disconnectButton.style.display = 'block';
    accountInfo.style.display = 'block'; // Or however you show it
    // ... display account info ...
  } else {
    connectButton.style.display = 'block';
    disconnectButton.style.display = 'none';
    accountInfo.style.display = 'none';
  }
}

// Call updateUI initially to set the correct button states
updateUI();