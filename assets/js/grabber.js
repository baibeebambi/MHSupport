$(document).ready(() => {
    $.get("https://pocket.minehut.com/network/top_servers", (data) => {
        $('#1').html(data.servers[0].name);
        $('#2').html(data.servers[1].name);
        $('#3').html(data.servers[2].name);
        $('#4').html(data.servers[3].name);
        $('#5').html(data.servers[4].name);
        $('#1b').html(data.servers[0].playerCount + ' / ' + data.servers[0].maxPlayers);
        $('#2b').html(data.servers[1].playerCount + ' / ' + data.servers[1].maxPlayers);
        $('#3b').html(data.servers[2].playerCount + ' / ' + data.servers[2].maxPlayers);
        $('#4b').html(data.servers[3].playerCount + ' / ' + data.servers[3].maxPlayers);
        $('#5b').html(data.servers[4].playerCount + ' / ' + data.servers[4].maxPlayers);
    });

    $.get("https://pocket.minehut.com/network/simple_stats", (data) => {
        var servp = (data.server_count / data.server_max) * 100
        servp = Math.ceil(servp);
        $("#myBar").css("width", servp + '%');
        $(".scoun").html('Server Count: ' + data.server_count + ' / ' + data.server_max);

        var ram = Math.ceil((Math.ceil(data.ram_count / 1000) / 512) * 100);
        $("#myBar2").css("width", ram + '%');
        $(".rcoun").html('Ram Usage: ' + Math.ceil((data.ram_count / 1000)) + ' / 512');
        $(".reecn").html(data.player_count);        
    });
});