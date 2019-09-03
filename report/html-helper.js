import Utility from './../page-objects/utility';

class HtmlHelper {

	getHtmlTemplate(...content){
		return `
			<html lang="en">
			    <head>
			        <meta charset="utf-8">
			        <meta name="viewport" content="width=device-width, initial-scale=1">
			        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
			        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css" />
			        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
			        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
			        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
			        <style> img {border: 3px solid #ddd; border-radius: 4px; padding: 5px; width: 100%; } </style> 
			    </head>
			    <body>
                	<div>${content.map( o => `<div>${o}</di>` ).join("")}</div>
            	</body>
	   		</html>
	  	`;
	}

	splitElementContainer( left, right ){
		return `<div class="container">
			<div class="row">
				<div class="col-6">
				${ ( left ) ? left : '' }
				</div>
				<div class="col-6">
				${ ( right ) ? right : '' }
				</div>
			</div>
		</div>`;
	}

	expandableImage(base64, extra=''){
		const elementId = Utility.generateUUID();
		return `
	    	<div>
		        <style>
		            #${elementId} {
		              border-radius: 5px;
		              cursor: pointer;
		              transition: 0.3s;
		            }
		            #${elementId}:hover {opacity: 0.7;}
		            .modal {
		              display: none; /* Hidden by default */
		              position: fixed; /* Stay in place */
		              z-index: 1; /* Sit on top */
		              padding-top: 100px; /* Location of the box */
		              left: 0;
		              top: 0;
		              width: 100%; /* Full width */
		              height: 100%; /* Full height */
		              overflow: auto; /* Enable scroll if needed */
		              background-color: rgb(0,0,0); /* Fallback color */
		              background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
		            }
		            .modal-content {
		              margin: auto;
		              display: block;
		              width: 80%;
		              max-width: 900px;
		            }
		            #caption {margin: auto; display: block; width: 80%; max-width: 700px; text-align: center; color: #ccc; padding: 10px 0; height: 150px; }
		            .modal-content, #caption {-webkit-animation-name: zoom; -webkit-animation-duration: 0.6s; animation-name: zoom; animation-duration: 0.6s; }
		            @-webkit-keyframes zoom {
		              from {-webkit-transform:scale(0)} 
		              to {-webkit-transform:scale(1)}
		            }
		            @keyframes zoom {
		              from {transform:scale(0)} 
		              to {transform:scale(1)}
		            }
		            .close${elementId} {
		              position: absolute;
		              top: 15px;
		              right: 35px;
		              color: #f1f1f1;
		              font-size: 40px;
		              font-weight: bold;
		              transition: 0.3s;
		            }
		            .close${elementId}:hover,
		            .close${elementId}:focus {
		              color: #bbb;
		              text-decoration: none;
		              cursor: pointer;
		            }
		            @media only screen and (max-width: 700px){
		              .modal-content {
		                width: 100%;
		              }
		            }
		        </style>
		        <div class="row">
		            <div class="col">
		                <img id="${elementId}" class="img-thumbnail" alt="" src="${ base64 }">
		            </div>
		        </div>
		        <div class="row">
		            <div class="col">
		                ${extra}
		            </div>
		        </div>
		        <div id="myModal${elementId}" class="modal">
		          <span class="close${elementId}">&times;</span>
		          <img class="modal-content" id="${elementId}01">
		          <div id="caption"></div>
		        </div>
		        <script>
		            var modal = document.getElementById("myModal${elementId}");
		            var img = document.getElementById("${elementId}");
		            var modalImg = document.getElementById("${elementId}01");
		            var captionText = document.getElementById("caption");
		            img.onclick = function(){
		              modal.style.display = "block";
		              modalImg.src = this.src;
		              captionText.innerHTML = this.alt;
		            }
		            var span = document.getElementsByClassName("close${elementId}")[0];
		            span.onclick = function() { 
		              modal.style.display = "none";
		            }
		        </script>
	    	</div>
	    `;
	}

	/**
	 * Example:
	 * table(
	 [
	 { name: 'Column1 Name', key: 'prop_name1', size: 150 },
	 { name: 'Column2 Name', key: 'prop_name2' }
	 ],
	 [
	 { prop_name1: 'A1', prop_name2: 'B1', },
	 { prop_name1: 'A2', prop_name2: 'B2', },
	 { prop_name1: 'A3', prop_name2: 'B3', }
	 ],
	 "Table Title"
	 );
	 * @param header
	 * @param data
	 * @param title (optional)
	 * @returns {string}
	 */
	table( header, data = [], title = false, height = 340 ){
		if( ! header ) throw new Error('Missing header column');
		//filter items in header with out a key
		//th, td { padding: 8px 16px; }
		return  `<div>
				<div class="table-responsive">
				<style>
					.tableFixHead          { overflow-y: auto; height: 100px; } 
					.tableFixHead thead th { position: sticky; top: 0; }
					table  { border-collapse: collapse; }
					th     { background:#eee; }
					td 	   {  font-size: 11px; }
				</style>
				<h6>${title || ''}</h6>
                <table class="table table-bordered tableFixHead" style="border: 1px solid #ddd !important;">
                    <thead class="thead-dark">
                        <tr class="thead-dark">
                        	${ header.map( o => `<th ${ o['size'] ? `style="width: ${o.size}px;"` : ''}>${o.name}</th>`).join('') }
                        </tr>
                    </thead>
                    <tbody>
                    ${ data.map(
						o => `<tr>${ header.map( h => `<td>${ ( o && h['key'] && o[h['key']] ) ? o[h['key']] : ''}</td>` ).join('') }</tr>`
					).join("") }
					</tbody>
                </table>
              </div>
            </div>
			</div>`;
	}

	tableNoStyle( header, data = [], title = false, height = 340 ){
		if( ! header ) throw new Error('Missing header column');
		return  `
				<div class="container">
				<style>
					td {
						overflow-wrap: break-word;
					}
				</style>
				<h6>${title || ''}</h6>
                <table>
                    <thead>
                        <tr>
                        	${ header.map( o => `<th ${ o['size'] ? `style="width: ${o.size}px;"` : ''}>${o.name}</th>`).join('') }
                        </tr>
                    </thead>
                    <tbody>
                    ${ data.map(
			o => `<tr>${ header.map( h => `<td>${ ( o && h['key'] && o[h['key']] ) ? o[h['key']] : ''}</td>` ).join('') }</tr>`
		).join("") }
					</tbody>
                </table>
              </div>
            </div>`;
	}

	link( content ){ return `<a target="_blank" href="${content}"> ${content} </a>`; }
	imageElement(base64,title=false){ return `
		<div>
			${ title ? `<h6>${title}</h6>` : ''} 
			<img class="img-thumbnail" src="data:image/png;base64, ${base64}">
		</div>
		`;
	}
	container(...content){
		return `<div class="container">${this.rowElement(...content)}</div>`;
	}
	toolTip(content, text="Default ToolTip", enable=true){
		return `<style>
			.tooltip {
			  position: relative;
			  display: inline-block;
			  border-bottom: 1px dotted black;
			}
			.tooltip .tooltiptext {
			  visibility: hidden;
			  width: 120px;
			  background-color: #555;
			  color: #fff;
			  text-align: center;
			  padding: 5px 0;
			  border-radius: 6px;
			  position: absolute;
			  z-index: 1;
			  bottom: 125%;
			  left: 50%;
			  margin-left: -60px;
			  opacity: 0;
			  transition: opacity 0.3s;
			}
			.tooltip .tooltiptext::after {
			  content: "";
			  position: absolute;
			  top: 100%;
			  left: 50%;
			  margin-left: -5px;
			  border-width: 5px;
			  border-style: solid;
			  border-color: #555 transparent transparent transparent;
			}
			.tooltip:hover .tooltiptext {
			  visibility: visible;
			  opacity: 1;
			}
		</style>
		<div class="tooltip">${content}
  			<span class="tooltiptext">${text}</span>
		</div>`;
	}
	scrollableContainer(content,height=240){
		const style = `height: ${height}px; overflow: scroll;`;
		return `<div style="${style}">${content}</div>`;
	}
	countBadge(value,isBad=false){ return `<span class="badge ${ isBad ? 'badge-danger' : 'badge-success' } badge-pill">${value}</span>`; }
	jsonElement( content, pretty=true ){
		if( pretty ){
			return `<pre> ${JSON.stringify(content,null,'\t')} </pre>`;
		} else {
			return JSON.stringify(content);
		}
	}
	list( ...listItems ){ return `<ul class="list-group">${ listItems.map( o => `<li class="list-group-item">${o}</li>`).join("") }</ul>`; }
	rowElement( ...content ){ return content.map( o => `<div class="row"><div class="col">${o}</div></div>` ).join(""); }
	title(title){
		return `<h6><b>${title}</b></h6>`;
	}
	passFailIcon(yesOrNo = false){
		return yesOrNo ? '<i class="fas fa-check-circle" style="color:green;"></i>' :
			'<i class="fas fa-exclamation-triangle" style="color:red;"></i>';
	}
	missingIcon(size=1) {
		return `<i class="fas fa-file-image-o" style="color:red; font-size: ${size}em;"></i>`;
	}
}

export default new HtmlHelper();