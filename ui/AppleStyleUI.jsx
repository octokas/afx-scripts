// @target aftereffects
(function () {
    // Modern SF Pro font styling
    var sfProFont = ScriptUI.newFont("SF Pro Display", "Regular", 13);

    var mainWindow = new Window("palette", "After Effects Tools", undefined);
    mainWindow.alignChildren = ["fill", "top"];
    mainWindow.spacing = 16;
    mainWindow.margins = 20;

    // Apple-style light/dark mode detection
    var systemColorMode = app.systemColorMode;
    var bgColor = systemColorMode === 'dark' ? [0.12, 0.12, 0.12] : [0.98, 0.98, 0.98];
    var textColor = systemColorMode === 'dark' ? [1, 1, 1] : [0, 0, 0];

    mainWindow.graphics.backgroundColor = mainWindow.graphics.newBrush(mainWindow.graphics.BrushType.SOLID_COLOR, bgColor);

    // Header section with SF Symbol-like icon
    var headerGroup = mainWindow.add("group");
    headerGroup.alignment = ["fill", "top"];
    var title = headerGroup.add("statictext", undefined, "AE Tools");
    title.graphics.font = ScriptUI.newFont("SF Pro Display", "Bold", 18);
    title.graphics.foregroundColor = title.graphics.newPen(mainWindow.graphics.PenType.SOLID_COLOR, textColor, 1);

    // Main content area with rounded corners
    var contentGroup = mainWindow.add("group");
    contentGroup.alignChildren = ["fill", "top"];
    contentGroup.alignment = ["fill", "top"];
    contentGroup.spacing = 12;

    // Modern button styling
    function createStyledButton(parent, text) {
        var btn = parent.add("button", undefined, text);
        btn.size = [200, 32];
        btn.graphics.font = sfProFont;
        return btn;
    }

    // Action buttons with SF Symbol-inspired icons
    var newCompBtn = createStyledButton(contentGroup, "🎬 New Composition");
    var importBtn = createStyledButton(contentGroup, "📥 Import Media");
    var exportBtn = createStyledButton(contentGroup, "📤 Export");

    // Settings section
    var settingsGroup = mainWindow.add("group");
    settingsGroup.orientation = "column";
    settingsGroup.alignment = ["fill", "top"];
    settingsGroup.spacing = 8;

    var settingsLabel = settingsGroup.add("statictext", undefined, "Settings");
    settingsLabel.graphics.font = ScriptUI.newFont("SF Pro Display", "Semibold", 14);

    // Modern toggle switches
    var autoSaveCheck = settingsGroup.add("checkbox", undefined, "Auto-Save");
    autoSaveCheck.value = true;

    // Show the UI
    mainWindow.center();
    mainWindow.show();
})();
