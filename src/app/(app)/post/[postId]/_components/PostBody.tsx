type PostPageProps = {
    body: string;
};

export const PostBody = ({ body }: PostPageProps) => {
    return (
        <div
            dangerouslySetInnerHTML={{ __html: body }}
            className="text-sm md:text-lg"
        ></div>
    );
};
