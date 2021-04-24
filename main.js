let direction = null;
let drag = false;
let start = null;
let transform = null;
let dif=null;

window.addEventListener("load", function(){
    const $carousel = document.querySelector(".slider");
    const $slide = document.querySelector(".slide");

    if($carousel){
        let size = $slide.firstElementChild.clientWidth;
       

        let style = window.getComputedStyle($slide.firstElementChild).marginRight; //calcule the margin of the element;
        let margin = Number(style.replace(/[^0-9]/g,''));
        $slide.style.transform = `translateX(-${size + margin}px)`;

        window.addEventListener("resize", () => {
            size = $slide.firstElementChild.clientWidth;
            style = window.getComputedStyle($slide.firstElementChild).marginRight;
            margin = Number(style.replace(/[^0-9]/g,''));
            $slide.style.transform = `translateX(-${size + margin}px)`;    
        })

        function moveRight(){
            $slide.style.transition ="all 0.5s"; 
            $slide.style.transform = `translateX(0)`;
            direction = -1;
        }

        function moveLeft(){
            $slide.style.transition ="all 0.5s";
            $slide.style.transform = `translateX(-${2*(size + margin)}px)`;
            direction = 1;
        } 
        
        function handleStart(e){
            if(e.target.matches(".item")){
                drag=true;  
                console.log(e.pageX);
                start=e.pageX || e.touches[0].pageX;  
                const transformMatrix = window.getComputedStyle($slide).transform;
                if(transformMatrix != "none") transform = parseInt(transformMatrix.split(",")[4].trim());
             }    
        }

        function handleMove(e){
            if(drag){
                const current = e.pageX;
                dif = current - start;
                $slide.style.transform = `translateX(${dif + transform}px)`;
            }
        }

        function handleUp(e){
            drag=false;
            if(!e.target.matches(".item"))return;
            console.log(dif, e.target, e.target.matches("item"))
            if(e.target.matches(".item")){
                if (dif < -55) {
                    moveLeft();
                  }
                  if ((dif > -55 && dif <= 0) || (dif > 0 && dif < 55)) {
                    $slide.style.transform = `translateX(${-(size + margin)}px)`;
                    return;
                  }
                  if (dif >= 55) {
                    moveRight();
                    return;
                  }
            }
        }

        function handleLeave(){
            drag=false;
        }

        //click events
        window.addEventListener("click", e => {
            if(e.target.matches("#prev-btn")){
                moveRight();
            }

            if(e.target.matches("#next-btn")){
               moveLeft();
            }
        })
        if(window.PointerEvent){
            $slide.addEventListener("pointerdown", handleStart);

            $slide.addEventListener("pointermove", handleMove);
        
            window.addEventListener("pointerup", handleUp);

            $slide.addEventListener("pointerleave",handleLeave);
        }else{
            $slide.addEventListener("mousedown", handleStart);

            $slide.addEventListener("mousemove", handleMove);
        
            window.addEventListener("mouseup", handleUp);

            $slide.addEventListener("mouseleave",handleLeave);

            $slide.addEventListener("touchstart", handleStart);

            $slide.addEventListener("touchmove", handleMove);
        
            window.addEventListener("touchend", handleUp);
        }

        window.addEventListener("transitionend", () => {
            if(direction == -1) $slide.prepend($slide.lastElementChild);
            if(direction == 1) $slide.append($slide.firstElementChild);

            $slide.style.transition ="none";
            $slide.style.transform = `translateX(-${size + margin}px)`;
        })  
    }
})