import Noty from 'noty';

export const showSuccess = (message: string) => {
  return new Noty({
    type: 'success',
    timeout: 5000,
    theme: 'bootstrap-v4',
    layout: 'topCenter',
    text: message,
    progressBar: false,
    closeWith: ['button'],
  }).show();
};

export const showError = (message: string, duplicate: boolean = true) => {
  if (message === 'Unauthorized') {
    message = 'You are logged out. Please re-login';
  }

  const notyfy = new Noty({
    type: 'error',
    timeout: 5000,
    theme: 'bootstrap-v4',
    layout: 'topCenter',
    text: message,
    progressBar: false,
    closeWith: ['button'],
  });

  if (duplicate || (!duplicate && !document.getElementById('noty_layout__topCenter'))) {
    notyfy.show();
  } /*  else if (!duplicate && !document.getElementById('noty_layout__topCenter')) {
    notyfy.show(); TODO:Sonar This branch's code block is the same as the block for the branch on line 26.
  } */
  return notyfy;
};
