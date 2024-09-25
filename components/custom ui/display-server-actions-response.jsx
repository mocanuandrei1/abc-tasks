export function DisplayServerActionResponse({ result }) {
  const { data, serverError, fetchError, validationErrors } = result;

  return (
    <>
      {/* Success Message */}
      {data?.message ? <h2 className="text-2xl my-2">{data.message}</h2> : null}

      {serverError ? (
        <div className="my-2 text-red-500">
          <p>{serverError}</p>
        </div>
      ) : null}

      {fetchError ? (
        <div className="my-2 text-red-500">
          <p>{fetchError}</p>
        </div>
      ) : null}

      {validationErrors ? (
        <div className="my-2 text-red-500">
          {Object.keys(validationErrors).map((key) => (
            <p key={key}>{`${key}: ${validationErrors[key]}`}</p>
          ))}
        </div>
      ) : null}
    </>
  );
}
