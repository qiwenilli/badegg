
    function badEgg(bodyName) {

        var active = false;
        var center;
        var rotateTarget;
        var resizeTarget;
        var pp;

        //
        rotateTarget = $(bodyName + " .rotatebox");
        resizeTarget = $(bodyName + " .resizebox");

        //
        Rotation();
        Move();
        Resize();

        function Rotation() {
            //
            rotateTarget.bind('mousedown', RotationStartEvent);
        }

        function RotationStartEvent(event) {
            //这里阻止冒泡，多次定义这个事件，只生效一次，也不再向父级冒泡
            event.preventDefault();
            event.stopPropagation();
            //

            pp = $(this).parent();

            var height, left, top, width, x, y, _ref;
            _ref = this.parentNode.getBoundingClientRect(),
                top = _ref.top,
                left = _ref.left,
                height = _ref.height,
                width = _ref.width;

            //找到左边到物体中的坐标
            center = {
                x: left + width / 2,
                y: top + height / 2,
            }

            //计算物体缩放后，右上角位置偏移的角度
            var startAngle = Math.atan2(event.clientY - center.y, event.clientX - center.x) * (180 / Math.PI);
            pp.attr('data-startAngle', startAngle);

            active = true;
            //
            $(document).bind('mousemove', RotationMoveEvent);
            $(document).bind('mouseup', RotationUpEvent);
        }

        function RotationMoveEvent(event) {
            event.preventDefault();
            event.stopPropagation();
            //

            //计算鼠标到物体中心的角度
            var _angle = Math.atan2(event.clientY - center.y, event.clientX - center.x) * (180 / Math.PI);
            var _startAngle = parseFloat(pp.attr('data-startAngle')) || 0;
            var rotation = _angle - _startAngle;
            pp.attr('data-rotation', rotation);

            if (active) {
                var angle = parseFloat(pp.attr('data-angle')) || 0;
                //
                var
                    x = parseFloat(pp.attr('data-x')) || 0,
                    y = parseFloat(pp.attr('data-y')) || 0;

                pp.css('webkitTransform', 'translate(' + x + 'px,' + y + 'px) rotate(' + (rotation + angle) + 'deg)');
            }
        }

        function RotationUpEvent(event) {
            active = false;

            //
            // var pp = $(this).parent();
            var rotation = parseFloat(pp.attr('data-rotation')) || 0;
            var angle = parseFloat(pp.attr('data-angle')) || 0;
            angle += rotation;
            pp.attr('data-angle', angle);
            //

            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
        }
        //rotation end

        //move
        function Move() {

            pp = $(bodyName);

            pp.bind('mousedown', MoveDownEvent);
            pp.bind('mouseenter', MoveEnterEvent);
            pp.bind('mouseleave', MoveLeaveEvent);
            //
            $(document).bind('mouseup', MoveUpEvent);
        }

        function MoveDownEvent(event) {
            event.preventDefault();

            // store the mouse position
            _startX = event.clientX;
            _startY = event.clientY;

            // store draggable/image object position
            _offsetX = parseFloat($(this).attr('data-x')) || 0;
            _offsetY = parseFloat($(this).attr('data-y')) || 0;

            pp = $(this);

            $(document).bind('mousemove', MoveMoveEvent);
            $(document).bind('mouseup', MoveUpEvent)
        }
        function MoveMoveEvent(event) {
            event.preventDefault();

            var _x = _offsetX + event.clientX - _startX;
            var _y = _offsetY + event.clientY - _startY;
            var a = parseFloat(pp.attr('data-angle')) || 0;

            pp.attr('data-x', _x);
            pp.attr('data-y', _y);

            pp.css('webkitTransform', 'translate(' + (_x) + 'px,' + (_y) + 'px) rotate(' + a + 'deg)');
        }
        function MoveUpEvent(event) {
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
        }
        function MoveEnterEvent(event) {
            $("body").css('cursor', 'move');
        }
        function MoveLeaveEvent(event) {
            $("body").css('cursor', 'auto');
        }
        //move end

        //resize
        function Resize() {
            resizeTarget.bind('mousedown', ResizeStartEvent);

            pp = $(this).parent();
        }
        function ResizeStartEvent(event) {
            event.preventDefault();
            event.stopPropagation();

            //
            _startX = event.clientX;
            _startY = event.clientY;
            //
            pp = $(this).parent();
            //
            _old_width = pp.width();
            _old_height = pp.height();

            $(document).bind('mousemove', ResizeMoveEvent);
            $(document).bind('mouseup', ResizeEndEvent);
        }
        function ResizeMoveEvent(event) {

            let w = event.clientX - _startX + _old_width;
            let h = event.clientY - _startY + _old_height;

            pp.width(w);
            pp.height(h);
        }
        function ResizeEndEvent(event) {
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
        }
        //resize end
    }
