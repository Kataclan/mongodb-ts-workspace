export module Styles {
    export var Colors = {
        primary: "#8d00cd",
        white: "#ffffff",
        whiteDisabled: "rgba(255, 255, 255, 0.5)",
        lightGray1: "rgb(236, 236, 236)",
        darkGray: 'rgb(100, 100, 100)'
    };

    export var Fonts = {
        primary: 'Poppins'
    }

    export var NodallBar = {
        height: 80
    }

    export var ControlsBar = {
        height: 50,
        background: Colors.primary,
        foreground: Colors.white,
        disabled: Colors.whiteDisabled
    };

    export var Footer = {
        inlineStyle: {
            position: 'relative',
            width: '100%',
            height: 65,
            backgroundColor: Colors.primary,
            textAlign: 'center',
            color: Colors.white,
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 20,
        } as React.CSSProperties,
        height: 65,
        containerStyle: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto',
            width: 120,
            height: '100%',
            textAlign: 'center',
        } as React.CSSProperties,
        spanStyle: {
            alignSelf: 'center',
            color: 'white',
            fontWeight: 'bold'
        } as React.CSSProperties
    }

    export var VideoItem = {
        mainContainer: {
            padding: '10px 10px 0px 10px',
            boxSizing: 'border-box',
            overflow: 'hidden'

        } as React.CSSProperties,
        contentContainer: {
            width: '100%',
            border: '1px solid #eee',
            overflow: 'hidden',
            boxSizing: 'border-box'
        } as React.CSSProperties,
        videoImg: {
            width: '100%',
            height: 250,
            float: 'left',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%',
            backgroundSize: 'cover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            //marginRight: 14
        } as React.CSSProperties,
        videoInfoContainer: {
            width: '100%',
            float: 'left',
            backgroundColor: Styles.Colors.lightGray1,
            padding: 10,
            overflow: 'hidden',
            boxSizing: 'border-box'
        } as React.CSSProperties,
        videoTitleContainer: {
            width: '100%',
            overflow: 'hidden'
        } as React.CSSProperties,
        videoTitle: {
            fontSize: 20,
            color: Styles.Colors.primary,
            fontWeight: 'bold',
            float: 'left'
        } as React.CSSProperties,
        videoTime: {
            float: 'right',
            color: Styles.Colors.darkGray
        } as React.CSSProperties,
        description: {
            fontSize: 14,
            color: Styles.Colors.darkGray
        } as React.CSSProperties
    }
}