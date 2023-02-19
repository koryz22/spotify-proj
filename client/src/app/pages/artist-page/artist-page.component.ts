import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ArtistData } from "../../data/artist-data";
import { TrackData } from "../../data/track-data";
import { AlbumData } from "../../data/album-data";

import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: "app-artist-page",
  templateUrl: "./artist-page.component.html",
  styleUrls: ["./artist-page.component.css"],
})
export class ArtistPageComponent implements OnInit {
  artistId: string;
  artist: ArtistData;
  relatedArtists: ArtistData[];
  topTracks: TrackData[];
  albums: AlbumData[];

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get("id");
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    this.spotifyService.getArtist(this.artistId).then((getArtistData) => {
      this.artist = getArtistData;
      console.log(this.artist)
    });
    this.spotifyService.getRelatedArtists(this.artistId).then((relatedArtistsData) => {
      this.relatedArtists = relatedArtistsData;
      console.log(this.relatedArtists)
    });
    this.spotifyService.getAlbumsForArtist(this.artistId).then((relatedAlbumsData) => {
      this.albums = relatedAlbumsData;
      console.log(this.albums)
    });
    this.spotifyService.getTopTracksForArtist(this.artistId).then((topTracksData) => {
      this.topTracks = topTracksData;
      console.log(this.topTracks)
    });
  }
}
