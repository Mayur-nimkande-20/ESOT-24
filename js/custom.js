// // Format SatSchedule
// class scheduleEvent {
//     constructor(title, start, end, track) {
//         this.title = title;
//         this.startTime = start;
        
//         if (track == undefined){
//           this.end = null
//           this.track = end;
//         }
//         else{
//           this.endTime = end;
//           this.track = track;
//         }
        
//     }

// }

// var saturday = [];
// var sunday = [];

// // track = {main, ws} where ws is workshop
// saturday.push(new scheduleEvent("Check-In Opens", "10:00", "main"));
// saturday.push(new scheduleEvent("Hacking Begins", "12:00", "main"));
// saturday.push(new scheduleEvent("Opening Ceremony", "11:00", "main"));
// saturday.push(new scheduleEvent("Introduction to Electronics", "12:15", "13:15", "ws"));
// saturday.push(new scheduleEvent("LUNCH", "13:00", "main"));
// saturday.push(new scheduleEvent("Coding Challenge by BlackRock", "13:30", "14:30", "ws"));
// saturday.push(new scheduleEvent("Entreprenuership workshop by Edinburgh Innovations", "15:00", "16:00", "ws"));
// saturday.push(new scheduleEvent("Workshop by Nexmo", "17:00", "18:00", "ws"));
// saturday.push(new scheduleEvent("Dinner", "19:00", "main"));
// saturday.push(new scheduleEvent("Werewolf by MLH (Social)", "20:00", "21:00", "ws"));
// saturday.push(new scheduleEvent("Sleep Drop-In Begins", "21:00", "main"));
// sunday.push(new scheduleEvent("Pizza!!", "00:00", "main"));
// sunday.push(new scheduleEvent("Hacking Ends", "12:00", "main"));
// sunday.push(new scheduleEvent("Breakfast", "08:00", "main"));
// sunday.push(new scheduleEvent("Lunch", "12:00", "main"));
// sunday.push(new scheduleEvent("Judging Commences", "13:15", "14:30", "main"));
// sunday.push(new scheduleEvent("Closing Ceremony", "15:00", "16:00", "main"));
// sunday.push(new scheduleEvent("Venue closed", "17:00", "main"));
// // sunday.push(new scheduleEvent("No workshops today", "00:00", "17:00", "ws"));

// saturday.sort((a,b) => (a.startTime >= b.startTime) ? 1: -1);
// sunday.sort((a,b) => (a.startTime >= b.startTime) ? 1 : -1 );

// var str = '<tbody>';
// str +=  '<tr><th></th><th>Main track</th><th></th><th>Workshops</th></tr>';
// saturday.forEach(function(ev, index){
//   if (index ==0  || saturday[index-1].startTime != ev.startTime){     
//     str += '<tr>';
//     if (ev.track == 'ws'){

//         str += '<th></th>';
//         str += '<td></td>';
//     }

//   str += '<th>';

//   str += ev.startTime 
//   if (ev.endTime){
//     str+='<br />|<br />' + ev.endTime;
//   }
//   str += '</th>';
//   str += '<td>';
//   str += ev.title + '';
//   str += '</td>';
  
//   if (ev.track == 'main'){
//       if(index != saturday.length-1 && ev.startTime == saturday[index+1].startTime){
//         str += '<th>';
//         str+=saturday[index+1].startTime
//         if(saturday[index+1].endTime){
//         str +=  '<br />|<br />' + saturday[index+1].endTime;
//       }
    
//   str += '</th>';
//   str += '<td>' + saturday[index+1].title+ '</td>';
//     }
//   else{
//   str +='<th></th>';
//   str += '<td></td>';
//   }}
  
//   str += '</tr>';
  
//   }

// });
// str += '</tbody>';
// window.document.getElementById("saturdayContainer").innerHTML = str;

// var str = '<tbody>';
// str +=  '<tr><th></th><th>Main track</th><th></th><th>Workshops</th></tr>';
// sunday.forEach(function(ev, index){
//   if (index ==0  || (sunday[index-1].startTime != ev.startTime || sunday[index-1].track == ev.track) ){     
//     str += '<tr>';
//     if (ev.track == 'ws'){

//         str += '<th></th>';
//         str += '<td></td>';
//     }
    
    

//   str += '<th>';

//   str += ev.startTime 
//   if (ev.endTime){
//     str+='<br />|<br />' + ev.endTime;
//   }
//   str += '</th>';
//   str += '<td>';
//   str += ev.title + '';
//   str += '</td>';
  
//   if (ev.track == 'main'){
//     if (index != sunday.length-1 && ev.startTime == sunday[index+1].startTime && ev.track != sunday[index+1].track){
//         str += '<th>';
//         str+=sunday[index+1].startTime
//         if(sunday[index+1].endTime){
//         str +=  '<br />|<br />' + sunday[index+1].endTime;
//       }
    
//   str += '</th>';
//   str += '<td>' + sunday[index+1].title+ '</td>';
    
//   }
//   else{
//   str +='<th></th>';
//   str += '<td></td>';
//   }}
  
//   str += '</tr>';
  
//   }

// });
// str += '</tbody>';
// window.document.getElementById("sundayContainer").innerHTML = str;

// New Code Added for Timeline 

window.addEventListener("DOMContentLoaded",() => {
	const ctl = new CollapsibleTimeline("#timeline");
});

class CollapsibleTimeline {
	constructor(el) {
		this.el = document.querySelector(el);

		this.init();
	}
	init() {
		this.el?.addEventListener("click",this.itemAction.bind(this));
	}
	animateItemAction(button,ctrld,contentHeight,shouldCollapse) {
		const expandedClass = "timeline__item-body--expanded";
		const animOptions = {
			duration: 300,
			easing: "cubic-bezier(0.65,0,0.35,1)"
		};

		if (shouldCollapse) {
			button.ariaExpanded = "false";
			ctrld.ariaHidden = "true";
			ctrld.classList.remove(expandedClass);
			animOptions.duration *= 2;
			this.animation = ctrld.animate([
				{ height: `${contentHeight}px` },
				{ height: `${contentHeight}px` },
				{ height: "0px" }
			],animOptions);
		} else {
			button.ariaExpanded = "true";
			ctrld.ariaHidden = "false";
			ctrld.classList.add(expandedClass);
			this.animation = ctrld.animate([
				{ height: "0px" },
				{ height: `${contentHeight}px` }
			],animOptions);
		}
	}
	itemAction(e) {
		const { target } = e;
		const action = target?.getAttribute("data-action");
		const item = target?.getAttribute("data-item");

		if (action) {
			const targetExpanded = action === "expand" ? "false" : "true";
			const buttons = Array.from(this.el?.querySelectorAll(`[aria-expanded="${targetExpanded}"]`));
			const wasExpanded = action === "collapse";

			for (let button of buttons) {
				const buttonID = button.getAttribute("data-item");
				const ctrld = this.el?.querySelector(`#item${buttonID}-ctrld`);
				const contentHeight = ctrld.firstElementChild?.offsetHeight;

				this.animateItemAction(button,ctrld,contentHeight,wasExpanded);
			}

		} else if (item) {
			const button = this.el?.querySelector(`[data-item="${item}"]`);
			const expanded = button?.getAttribute("aria-expanded");

			if (!expanded) return;

			const wasExpanded = expanded === "true";
			const ctrld = this.el?.querySelector(`#item${item}-ctrld`);
			const contentHeight = ctrld.firstElementChild?.offsetHeight;

			this.animateItemAction(button,ctrld,contentHeight,wasExpanded);
		}
	}
}