import BookCorner, { IBookCornerProps } from "components/BookCorner"
import { createContext, PropsWithChildren, useState } from "react"

const defaultBookContext: IBookCornerProps = {
  squareColor: 'transparent',
  bgColor: {
    start: 'transparent',
    end: 'transparent',
  },
}
export const BookContext = createContext({ value: defaultBookContext, setValue: (() => null) as Function })

const BookLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [bookContext, setBookContext] = useState(defaultBookContext)
  
  return (<>
    <BookContext.Provider value={{ value: bookContext, setValue: setBookContext }}>
      { children }
    </BookContext.Provider>
    <BookCorner bgColor={bookContext.bgColor} squareColor={bookContext.squareColor} />
  </>)
}

export default BookLayout