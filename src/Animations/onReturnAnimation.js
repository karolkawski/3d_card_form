export const onReturnAnimation = (callback) => {
	const Frame = document.querySelector(".App_Frame");
	const Return = document.querySelector(".App_Button--Return");
	const Gui = document.querySelector(".Gui");

	Return.classList.remove("App_Button--Show");
	Frame.classList.add("App_Animate--Hide");
	Frame.classList.remove("App_Animate");
	Gui.classList.remove("Gui_Animate");

	setTimeout(() => {
		callback(false);
	}, 500);
};
