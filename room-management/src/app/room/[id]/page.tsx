interface Params {
    params: {
      id: string;
    };
  }
  
  export default function DynamicPage({ params }: Params) {
    return (
      <div>
        <h1>Dynamic Page</h1>
        <p>The ID is: {params.id}</p>
      </div>
    );
  }
  