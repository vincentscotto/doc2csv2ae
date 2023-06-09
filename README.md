# doc2csv2ae
This converts a specifically formatted word doc to a csv, that you can then use `csv2ae.jsx` to import that into after effects.

## getting started
1) `git clone git@github.com:vincentscotto/doc2csv2ae.git`

2) `npm install`

3) `npm start`

following the directions on the page and the csv that is output should look like so: 

```
ID;Eyebrow copy;Body copy 1;Body copy 2;Footnote copy
Frame 1;This is the eyebrow copy content for Frame 1.;This is the body copy 1 content for Frame 1.;This is the body copy 2 content for Frame 1.;This is the footnote copy content for Frame 1.
Frame 2;This is the eyebrow copy content for Frame 2.;This is the body copy 1 content for Frame 2.;This is the body copy 2 content for Frame 2.;This is the footnote copy content for Frame 2.
Frame 3;This is the eyebrow copy content for Frame 3.;This is the body copy 1 content for Frame 3.;This is the body copy 2 content for Frame 3.;This is the footnote copy content for Frame 3.
```


## properly formatting word docs

the word docs **MUST** be structured correctly. see **template.docx** for an example.

each intended composition must start with **Frame #** and end with **=== FRAME END ===**

Basically each frame must be labeled like the following:

```
=== FRAME START ===

Frame 1

Eyebrow copy: This is the eyebrow copy content for Frame 1. 
Body copy 1: This is the body copy 1 content for Frame 1.
Body copy 2: This is the body copy 2 content for Frame 1. 
Footnote copy: This is the footnote copy content for Frame 1.

=== FRAME END ===
```

the above would be the first frame. if you wanted to add another, it would work like so:

```
=== FRAME START ===

Frame 1

Eyebrow copy: This is the eyebrow copy content for Frame 1. 
Body copy 1: This is the body copy 1 content for Frame 1.
Body copy 2: This is the body copy 2 content for Frame 1. 
Footnote copy: This is the footnote copy content for Frame 1.

=== FRAME END ===

=== FRAME START ===

Frame 2 

Eyebrow copy: This is the eyebrow copy content for Frame 2.
Body copy 1: This is the body copy 1 content for Frame 2.
Body copy 2: This is the body copy 2 content for Frame 2.
Footnote copy: This is the footnote copy content for Frame 2.

=== FRAME END ===
```

and so on and on and on...




