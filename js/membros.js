membros = null;

$.ajaxSetup({
    async: false
});

function setAcceptHeader(xhr) {
    xhr.setRequestHeader('Accept', 'application/vnd.github.3.raw');
}

$.ajax({
    dataType: "json",
    url: 'data/membros.json',
    success: function( data ) {
        membros = data;
    },
    error: function () {
        console.debug('failed');
    }
});

$.ajaxSetup({
    async: true
});

membros.sort(function(a, b){    
    if (a.nome > b.nome) return 1;
    
    if (b.nome > a.nome) return -1;
    
    return 0;
});

membrosContainer = document.getElementById('membrosContainer');
for (let index = 0; index < membros.length; index++) {
    const membro = membros[index];
    membrosContainer
    /*
        <div class="team-member-container col-sm-2">
            <div class="team-member-color-layer"> </div>
            <div class="team-member-desc">
                <span class="team-member-name">Membro 001</span>
                <span class="team-member-job">Cargo</span>
            </div>
            <img class="team-member-img" src="https://via.placeholder.com/150" width="100%" height="100%"/>
        </div>
    */

    var divTeamMember = document.createElement("div");
    divTeamMember.className = " team-member-container col-sm-2";

    var divTeamMemberColorLayer = document.createElement("div");
    divTeamMemberColorLayer.className = " team-member-color-layer";
    divTeamMember.appendChild(divTeamMemberColorLayer);
    
    var divTeamMemberDesc = document.createElement("div");
    divTeamMemberDesc.className = " team-member-desc";
    divTeamMember.appendChild(divTeamMemberColorLayer);

    var spanTeamMemberName = document.createElement("span");
    spanTeamMemberName.className = " team-member-name";
    spanTeamMemberName.innerHTML = 
        membro.linkedin === null || membro.linkedin === undefined ? 
        membro.nome 
        : 
        '<a href="' +  membro.linkedin + '" target="_blank">' + membro.nome + "</a>";
    divTeamMemberDesc.appendChild(spanTeamMemberName);

    var spanTeamMemberCargo = document.createElement("span");
    spanTeamMemberCargo.className = " team-member-job";
    spanTeamMemberCargo.innerText = (membro.cargo === null || membro.cargo === undefined)? '' : membro.cargo;
    divTeamMemberDesc.appendChild(spanTeamMemberCargo);

    divTeamMember.appendChild(divTeamMemberDesc);

    var imgTeamMemberFoto = document.createElement("img");
    imgTeamMemberFoto.className = " team-member-img";
    imgTeamMemberFoto.src = (membro.foto === null || membro.foto === undefined)? "https://via.placeholder.com/150" : membro.foto;
    imgTeamMemberFoto.width = 150;
    imgTeamMemberFoto.style.maxWidth = "150px";
    imgTeamMemberFoto.style.maxHeight = "150px";
    imgTeamMemberFoto.height = 150;
    divTeamMember.appendChild(imgTeamMemberFoto);

    membrosContainer.appendChild(divTeamMember);

}


function filtraMembros() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("filtraElemento");
    filter = input.value.toUpperCase();
    membros = document.getElementById("membrosContainer").children;
    for (i = 0; i < membros.length; i++) {
      nome = membros[i].getElementsByTagName("span")[0].innerText.toUpperCase();
      if (nome) {
        if (nome.toUpperCase().indexOf(filter) > -1) {
            membros[i].style.display = "";
        } else {
            membros[i].style.display = "none";
        }
      }       
    }
  }
