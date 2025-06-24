(function(){
  var connection = new Postmonger.Session();
  var payload = {};

  $(window).ready(function(){
    connection.trigger("ready");
    connection.on("initActivity", initialize);
    connection.on("clickedNext", save);
    $("#wa-message").on("input", function(){
      connection.trigger("updateButton", {button:"next", enabled: !!$(this).val().trim()});
    });
  });

  function initialize(data){
    payload = data || {};
    const inArgs = payload.arguments?.execute?.inArguments;
    if (inArgs?.length > 0 && inArgs[0].message) {
      $("#wa-message").val(inArgs[0].message);
    }
  }

  function save(){
    const message = $("#wa-message").val().trim();
    payload.arguments.execute.inArguments = [{ message }];
    payload.metaData.isConfigured = true;
    connection.trigger("updateActivity", payload);
  }
})();
