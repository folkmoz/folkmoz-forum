type PostPageProps = {
    body: string;
};

export const PostBody = ({ body }: PostPageProps) => {
    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: body }}></div>
        </div>
    );
};
