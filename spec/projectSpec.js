describe("project", function () {
  it("serve your spec file over http with live-server, (not file: protocol)", function () {
    const result = window.location.protocol;
    expect(
      result,
      "Serve over http instead of file by using live-server"
    ).to.equal("http:");
  });

  it("Update your ./planning.md file in your repo with more thoughts, research, and plans", function (done) {
    fetch("./planning.md")
    .then(res => res.text())
    .then((data) => {
      const planningLines = data.split("\n").length;
      const wroteSomePlanning = planningLines > 60;
      try {
        expect(
          wroteSomePlanning,
          "Do regular planning and reflection in your ./planning.md file"
        ).to.equal(true);
        done();
      } catch(err) {
        done(err);
      }
    });
  });
});