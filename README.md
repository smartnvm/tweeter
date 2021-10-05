# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This repository is the starter code for the project: Students will fork and clone this repository, then build upon it to practice their HTML, CSS, JS, jQuery and AJAX front-end skills, and their Node, Express and MongoDB back-end skills.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above


--------------

# justify-content

```css
#pond {
  display: flex;
justify-content: flex-end;
}

#pond {
  display: flex;
justify-content: center 
}
```
## flex-start: 
  Items align to the left side of the container.
## flex-end: 
  Items align to the right side of the container.
## center: 
Items align at the center of the container.
## space-between:
 Items display with equal spacing between them.
## space-around:
 Items display with equal spacing around them.



# align-items
```css
#pond {
  display: flex;
  align-items: flex-end
}
```
## flex-start:
  Items align to the top of the container.
## flex-end: 
  Items align to the bottom of the container.
## center: 
  Items align at the vertical center of the container.
## baseline:
  Items display at the baseline of the container.
## stretch:
  Items are stretched to fit the container.

# Combine
  - combine flex css properties with `;` 
```css
#pond {
  display: flex;
align-items: center;
justify-content: center
}
```


# flex-direction 
```css
#pond {
  display: flex;
  flex-direction: row-reverse
}
```

## *row*: 
  Items are placed the same as the text direction.
## *row-reverse*
  Items are placed opposite to the text direction.
## *column*: 
  Items are placed top to bottom.
## *column-reverse*: 
  Items are placed bottom to top.

```css

   #pond {
  display: flex;

  justify-items: flex-start;        /* LEFT side */
  justify-items: flex-end;          /* RIGHT side.*/
  justify-items: center;            /* CENTER.*/
  justify-items: space-between;     /* EVEN spacing horizontally*/
  justify-items: space-around;      /* EQUAL spacing AROUND*/
  
  
  align-items: flex-start;        /*Items align to the top of the container*/
  align-items: flex-end;          /*Items align at the bottom of the container.*/
  align-items: center;            /*Items align at the vertical center of the container.*/
  align-items: baseline;          /*Items display at the baseline of the container*/
  align-items: stretch;           /*Items are stretched to fit the container*/

  flex-direction: row;            /*same as the text direction*/
  flex-direction: row-reverse;    /*Oppostie to text direction*/
  flex-direction: column;         /*Top to Bottom*/
  flex-direction: column-reverse  /*Bottom to Top*/
}
```