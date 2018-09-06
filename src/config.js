let config = {
    branding: false,
    menubar: false,
    height: 500,
    body_class: 'content p-3',
    content_css: '/css/front/app.css',
    plugins: 'hr image link lists paste table',
    toolbar: `
        undo redo | 
        styleselect | 
        bold italic underline | 
        alignleft aligncenter alignright | 
        bullist numlist hr blockquote | 
        table link image | 
        removeformat | 
    `,
    formats: {
        alignleft: {
            classes: '',
            selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,table,img'
        },
        aligncenter: {
            classes: 'has-text-centered',
            selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,table,img'
        },
        alignright: {
            classes: 'has-text-right',
            selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,table,img'
        }
    },
    style_formats: [
        {
            title: 'Headings',
            items: [
                { title: 'Heading 1', block: 'h1' },
                { title: 'Heading 2', block: 'h2' },
                { title: 'Heading 3', block: 'h3' },
                { title: 'Heading 4', block: 'h4' },
                { title: 'Heading 5', block: 'h5' },
                { title: 'Heading 6', block: 'h6' },
                { title: 'Paragraph', block: 'p' }
            ]
        },
        {
            title: 'Heading Styles',
            items: [
                {
                    title: 'Title',
                    classes: 'title',
                    selector: 'h1,h2,h3,h4,h5,h6'
                },
                {
                    title: 'Subtitle',
                    classes: 'subtitle',
                    selector: 'h1,h2,h3,h4,h5,h6'
                }
            ]
        },
        {
            title: 'Inline Styles',
            items: [
                {
                    title: 'Button',
                    classes: 'button is-primary',
                    selector: 'a'
                }
            ]
        },
        {
            title: 'Image Styles',
            items: [
                {
                    title: 'Image left',
                    classes: 'is-left',
                    selector: 'img'
                },
                {
                    title: 'Image right',
                    classes: 'is-right',
                    selector: 'img'
                },
                {
                    title: 'Image centered',
                    classes: 'is-centered',
                    selector: 'img'
                }
            ]
        }
    ],
    table_responsive_width: true,
    table_appearance_options: false,
    table_default_styles: {
        width: '100%'
    },
    table_default_attributes: {
        border: 0,
        class: 'table is-bordered'
    }
};

export default config;