const Filter = ({search, event})=>{
    return(
        <div>
            <form>
                filter shown with: <input value={search} onChange={event} />
            </form>
        </div>
    )
}

export default Filter