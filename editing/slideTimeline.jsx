// @target aftereffects
(function() {
    // Slide class to manage individual slide properties
    function Slide(startTime, duration, name) {
        this.startTime = startTime || 0;
        this.duration = duration || 5; // Default 5 second duration
        this.name = name || "Slide " + (SlideManager.slides.length + 1);
        this.layers = [];
    }

    // Main SlideManager object
    var SlideManager = {
        slides: [],
        activeComp: null,

        initialize: function() {
            this.activeComp = app.project.activeItem;
            if (!(this.activeComp instanceof CompItem)) {
                alert("Please select a composition first!");
                return false;
            }
            return true;
        },

        createSlide: function(duration) {
            if (!this.initialize()) return;

            var newSlide = new Slide(
                this.getTotalDuration(),
                duration
            );

            // Create marker for slide
            var marker = new MarkerValue(newSlide.name);
            this.activeComp.markerProperty.setValueAtTime(newSlide.startTime, marker);

            this.slides.push(newSlide);
            this.updateCompDuration();

            return newSlide;
        },

        getTotalDuration: function() {
            return this.slides.reduce(function(total, slide) {
                return total + slide.duration;
            }, 0);
        },

        updateCompDuration: function() {
            this.activeComp.duration = Math.max(
                this.getTotalDuration(),
                this.activeComp.duration
            );
        },

        moveSlide: function(fromIndex, toIndex) {
            if (fromIndex === toIndex) return;

            var slide = this.slides.splice(fromIndex, 1)[0];
            this.slides.splice(toIndex, 0, slide);
            this.recalculateTimings();
        },

        recalculateTimings: function() {
            var currentTime = 0;
            for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides[i];
                slide.startTime = currentTime;
                currentTime += slide.duration;

                // Update marker position
                var marker = new MarkerValue(slide.name);
                this.activeComp.markerProperty.setValueAtTime(slide.startTime, marker);
            }
            this.updateCompDuration();
        }
    };

    // Create UI
    var window = new Window("palette", "Slide Timeline Manager", undefined);
    window.orientation = "column";

    var addSlideBtn = window.add("button", undefined, "Add New Slide");
    addSlideBtn.onClick = function() {
        SlideManager.createSlide(5); // 5 second default duration
    };

    var refreshBtn = window.add("button", undefined, "Refresh Timeline");
    refreshBtn.onClick = function() {
        SlideManager.recalculateTimings();
    };

    window.center();
    window.show();
})();
