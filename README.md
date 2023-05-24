# word-to-after-effects

## get that data yo!

a couple scripts for stripping content from a word doc, putting it to a CSV and another script that imports that CSV into After Effects creating comps for each section

## step 1

in the **STEP** 1 directory type:

```
npm install
```

after those packages are installed, the word docs MUST be structured correctly. see **template.docx** for an example.

each from must start with **Frame #** and end with **=== FRAME END ===**

Basically each frame must be labeled like the following:

```
Frame 1

Eyebrow copy: This is the eyebrow copy content for Frame 1.
Body copy 1: This is the body copy 1 content for Frame 1.
Body copy 2: This is the body copy 2 content for Frame 1.
Footnote copy: This is the footnote copy content for Frame 1.

=== FRAME END ===
```

the above would be the first frame. if you wanted to add another, it would work like so:

```
Frame 1

Eyebrow copy: This is the eyebrow copy content for Frame 1. 
Body copy 1: This is the body copy 1 content for Frame 1.
Body copy 2: This is the body copy 2 content for Frame 1. 
Footnote copy: This is the footnote copy content for Frame 1.

=== FRAME END ===

Frame 2 Title

Eyebrow copy: This is the eyebrow copy content for Frame 2.
Body copy 1: This is the body copy 1 content for Frame 2.
Body copy 2: This is the body copy 2 content for Frame 2.
Footnote copy: This is the footnote copy content for Frame 2.

=== FRAME END ===
```

and so on and on and on...

## step 2

we now can extract that text. type the following in the STEP 1 (for ease of use, ensure that the script and word doc are in the same directory)

###UPDATE:

```
npm start
```

and then visit:

```
http://localhost:3000/
```

or you can use the cmd line:

```
node word2json.js <input-file.docx> <output-file.csv>
```

that will extract all the text and put it in a csv, which is something we can easily import into After Effects. the output should look like the following:

```
ID;Eyebrow copy;Body copy 1;Body copy 2;Footnote copy
Frame 1;This is the eyebrow copy content for Frame 1.;This is the body copy 1 content for Frame 1.;This is the body copy 2 content for Frame 1.;This is the footnote copy content for Frame 1.
Frame 2;This is the eyebrow copy content for Frame 2.;This is the body copy 1 content for Frame 2.;This is the body copy 2 content for Frame 2.;This is the footnote copy content for Frame 2.
Frame 3;This is the eyebrow copy content for Frame 3.;This is the body copy 1 content for Frame 3.;This is the body copy 2 content for Frame 3.;This is the footnote copy content for Frame 3.
```

## step 3
