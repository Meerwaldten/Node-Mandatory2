import Toastify from 'toastify-js';

function showToastify(message) {
  const toast = Toastify({
    text: message,
    backgroundColor: '#FF6347'
  });
  toast.showToast();
}

export default showToastify;