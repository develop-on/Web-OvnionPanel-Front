var yo = require('yo-yo')

module.exports = function dialog (contrato) {

return yo`<div>

 <button type="button" class="mdl-button show-modal">Show Modal</button>
  <dialog class="mdl-dialog">
    <div class="mdl-dialog__content">
      <p>
        ${contrato}
      </p>
    </div>
    <div class="mdl-dialog__actions mdl-dialog__actions--full-width">
      <button type="button" class="mdl-button">Agree</button>
      <button type="button" class="mdl-button close">Disagree</button>
    </div>
  </dialog>
  <script>
    var dialog = document.querySelector('dialog');
    var showModalButton = document.querySelector('.show-modal');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    showModalButton.addEventListener('click', function() {
      dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });
</script>
</div>`	
}

