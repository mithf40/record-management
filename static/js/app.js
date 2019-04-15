App = {
    web3Provider: null,
    contracts: {},
  
    init: async function() {
      
  
      return await App.initWeb3();
    },
  
    initWeb3: async function() {
      /*
       * Replace me...
       */
  
      return App.initContract();
    },
  
    initContract: function() {
      /*
       * Replace me...
       */
  
      return App.bindEvents();
    },
  
    bindEvents: function() {
      $(document).on('click', '.btn-provider', App.handleProvider);
    //   $(document).on('click', '.btn-patient', App.handlePatient);
    },

    handleProvider: function(){
        event.preventDefault();

        window.location.href = "record.html";
    }
  
  
  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  